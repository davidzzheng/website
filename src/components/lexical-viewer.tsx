'use client'

import {
  InitialConfigType,
  InitialEditorStateType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect, useRef } from 'react'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { defaultEditorLexicalConfig, UploadNode } from '@payloadcms/richtext-lexical'
import { getEnabledNodes } from '@payloadcms/richtext-lexical'
import { Skeleton } from './ui/skeleton'
function InitialStatePlugin({ content }: { content: string }) {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.update(() => {
      editor.setEditorState(editor.parseEditorState(content))
    })
  }, [editor, content])

  return null
}
type LexicalViewerProps = {
  content: string
}

export const LexicalViewer = ({ content }: LexicalViewerProps) => {
  const initialConfig = {
    namespace: 'LexicalViewer',
    onError: (error: Error) => console.error(error),
    // editorState: content,
    editable: false,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListItemNode,
      ListNode,
      TableCellNode,
      TableNode,
      TableRowNode,
      CodeHighlightNode,
      CodeNode,
      AutoLinkNode,
      LinkNode,
    ],
  } satisfies InitialConfigType

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container prose dark:prose-invert max-w-none">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Skeleton className="w-full h-20" />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <InitialStatePlugin content={content} />
      </div>
    </LexicalComposer>
  )
}
