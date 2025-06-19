---
title: Implementing Infinite Scrolling with Next.js Server Actions and Drizzle
description: Doom scrolling made simple
date: 2024-07-22
isPublished: true

type: Post
---

Infinitely scrolling feeds. You see them everywhere these days. They are ubiquitous in the age of social media. And as a result there are countless ways to implement them, with some ways being more correct than others. For the method I'll be writing about, it probably sits in the "slightly incorrect but acceptable for now" box. It uses Drizzle on the backend and Next.js server actions on the frontend to tie things together.

TL;DR: [Source code](https://github.com/davidzzheng/infinite-scrolling-pokemon)

## A Note on Server Actions

The reason for the ambiguity is that, even though it works surprisingly well, the React docs do explicitly [recommend against](https://react.dev/reference/rsc/use-server#caveats) the usage of server actions for data fetching — presumably because there are far too many footguns at this stage of the API.

> Server Actions are designed for mutations that update server-side state; they are **not recommended for data fetching**. Accordingly, frameworks implementing Server Actions typically process one action at a time and do not have a way to cache the return value.

But with that said, I do think that the type-safety & simplicity of server actions do warrant the consideration when designing data fetching for certain parts of your app. Worst comes to worst, you can simply wrap the [server actions with tRPC](https://trpc.io/blog/trpc-actions) and invoke them as procedures. This way, you benefit both from the simplicity of server actions while also having the structured validation & broad ecosystem that tRPC is known for.

And personally, I always encourage experimentation in this sort of manner — the best way to learn how to build anti-fragile systems is by learning where they can bend and break. If you want to dive deeper into the topic, highly recommend giving this [article by Robin Wieruch](https://www.robinwieruch.de/next-server-actions-fetch-data/) a read.

Ok with all that aside, let's finally get into the implementation. First let's start with the database. For the sake of example, we're going to model a simple Pokemon database and populate it with data from `PokeAPI`.

# Implementation

## Database Setup

This part isn't that important so I've generated this part using an [LLM](https://www.perplexity.ai/search/model-a-basic-database-using-s-GaCKbRJZQ6C4QtSSEkt7YA). In practice, you should be able to query from any Drizzle table in the same manner. Here's a very simple Drizzle table schema.

```ts title="src/db/schema.ts"
export const pokemon = sqliteTable("pokemon", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  height: integer("height"),
  weight: integer("weight"),
  baseExperience: integer("base_experience"),
  sprite: text("sprite"),
});
```

## Server Action

Next, the server action:

```ts title="src/actions/pokemon.ts"
"use server";

export const fetchPokemonList = async (cursor: number, limit: number) => {
  const query = db.select().from(pokemon).orderBy(asc(pokemon.id)).limit(limit);
  return cursor ? query.where(gt(pokemon.id, cursor)) : query;
};
```

## Cursor-Based Pagination Abstraction

I found myself using the cursor pagination logic a lot throughout my app so I ended up abstracted it out so that it can be used for other queries.

```ts title="src/lib/db.ts"
type DataTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  array: any[];
  json: object;
  date: Date;
  bigint: bigint;
};
type ConvertDataType<T extends keyof DataTypeMap> = DataTypeMap[T];

type SortOrder = "asc" | "desc";

type CursorConfig<T extends SQLiteColumn> = {
  cursor?: ConvertDataType<T["dataType"]>;
  cursorColumn: T;
  limit: number;
  sortOrder?: SortOrder;
};

export const withCursorPagination = <
  T extends SQLiteColumn,
  U extends SQLiteSelect,
>(
  query: U,
  { cursor, cursorColumn, limit = 20, sortOrder = "desc" }: CursorConfig<T>,
) =>
  cursor
    ? query
        .orderBy(sortOrder === "asc" ? asc(cursorColumn) : desc(cursorColumn))
        .where(
          sortOrder === "desc"
            ? lt(cursorColumn, cursor)
            : gt(cursorColumn, cursor),
        )
        .limit(limit)
    : query
        .orderBy(sortOrder === "asc" ? asc(cursorColumn) : desc(cursorColumn))
        .limit(limit);
```

There's quite a bit of TypeScript magic going on here. But the gist of it is that the `cursor` type is inferred from `cursorColumn` so that when it's being used, the two types must match up.

## Fetching Hook

Next, onto the fetching hook

```ts title="src/state/feed.ts"
export const usePokemonFeed = (limit: number = 20) =>
  useInfiniteQuery({
    queryKey: ["pokemon-feed", limit],
    queryFn: async ({ pageParam }) => await fetchPokemonList(pageParam, limit),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.id,
  });
```

## Component

Finally, a barebones example of the component:

```tsx title="src/views/feed.tsx"
export const Feed = () => {
  const { data, error, fetchNextPage, isLoading } = usePokemonFeed();

  const feed = useMemo(() => (data ? data.pages.flat() : []), [data]);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {feed.map((pokemon) => (
        <div key={pokemon.id}>
          <img src={pokemon.sprite!} alt={pokemon.name} />
          <p>{pokemon.name}</p>
          <div>Weight: {pokemon.weight}</div>
        </div>
      ))}
      <button onClick={fetchNextPage}>Load More</button>
    </div>
  );
};
```

The data fetching portion of the feature is now finished. You can leave this as is and it would be perfectly functional. Fetching the next page is done manually by clicking a button and sometimes this is the behaviour that what you want. But if you to build this for the common doom scroller, you'll want the fetch to happen automatically.

## Intersection Observer Hook

Here's a basic implementation of a hook that automatically detects when an element is on screen using the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

```ts
type UseIntersectionObserverProps = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: () => void;
};

export const useIntersectionObserver = (
  { root, rootMargin, threshold, onIntersect }: UseIntersectionObserverProps = {
    rootMargin: "100px",
    threshold: 0.1,
  },
) => {
  const elementRef = useRef(null);

  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting) {
        onIntersect?.();
      }
    },
    [onIntersect],
  );

  useEffect(() => {
    const target = elementRef?.current;
    if (!target) return;

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [elementRef, root, rootMargin, threshold, handleIntersect]);

  return { elementRef, isIntersecting };
};
```

With this, we can then modify the component to include an invisible div element below the list which invokes fetch automatically when scrolled into view.

```ts
export const Feed = () => {
	const { data, error, fetchNextPage, isLoading } = usePokemonFeed()

	const { elementRef } = useIntersectionObserver({
		onIntersect: fetchNextPage,
	})

	const feed = useMemo(() => (data ? data.pages.flat() : []), [data])

	return (
		<div>
			{error && <div>Error: {error.message}</div>}
			{feed.map((pokemon) => (
				<div key={pokemon.id}>
					<img src={pokemon.sprite!} alt={pokemon.name} />
					<p>{pokemon.name}</p>
					<div>Weight: {pokemon.weight}</div>
				</div>
			))}
			<div ref={elementRef} className="opacity-0 h-0" />
		</div>
	)
}
```

## Wrapping Up

And there you have it — an infinitely scrolling feed using server actions and Drizzle. The full source code for this project can be found [here](https://github.com/davidzzheng/infinite-scrolling-pokemon).

# Resources

- [Data Fetching with Server Actions in Next.js](https://www.robinwieruch.de/next-server-actions-fetch-data/)
