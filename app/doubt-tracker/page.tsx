import { DoubtSequenceTracker } from "@/components/doubt-sequence-tracker"

export default function DoubtTrackerPage() {
  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Doubt Sequence Tracker</h1>
        <DoubtSequenceTracker />
      </div>
    </div>
  )
}

