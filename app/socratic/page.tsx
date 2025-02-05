import { PageHeader } from "@/components/ui/page-header"
import { SocraticQuestioning } from "@/components/socratic-questioning"

export default function SocraticPage() {
  return (
    <div className="container py-8">
      <PageHeader
        title="Socratic Questioning"
        description="Challenge your thoughts through guided dialogue and systematic questioning"
      />
      <div className="max-w-3xl mx-auto">
        <SocraticQuestioning />
      </div>
    </div>
  )
}

