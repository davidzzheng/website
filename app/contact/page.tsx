import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="mx-auto w-1/2">
      <form className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" type="text" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" />
        </div>
        <div className="flex justify-end">
          <Button type="submit" variant="default">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
