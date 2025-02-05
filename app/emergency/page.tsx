import { PageHeader } from "@/components/ui/page-header"
import { EmergencySupport } from "@/components/emergency-support"
import { CrisisChat } from "@/components/crisis-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EmergencyPage() {
  return (
    <div className="container py-8">
      <PageHeader title="Emergency Support" description="Get immediate help and support when you need it most" />
      <Tabs defaultValue="resources" className="max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="resources">Support Resources</TabsTrigger>
          <TabsTrigger value="chat">Crisis Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="resources">
          <EmergencySupport />
        </TabsContent>
        <TabsContent value="chat">
          <CrisisChat />
        </TabsContent>
      </Tabs>
    </div>
  )
}

