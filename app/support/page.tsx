import { PageHeader } from "@/components/ui/page-header"
import { SupportResources } from "@/components/support-resources"

export default function SupportPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Support Resources" description="Access helpful resources and connect with professionals" />
      <div className="max-w-4xl mx-auto">
        <SupportResources />
      </div>
    </div>
  )
}

