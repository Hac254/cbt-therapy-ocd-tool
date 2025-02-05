import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressCardProps {
  title: string
  emoji: string
  value: number
  description: string
  color?: string
}

export function ProgressCard({ title, emoji, value, description, color = "bg-primary" }: ProgressCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <span>{emoji}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold">{value}%</span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
        <Progress value={value} className={color} />
      </CardContent>
    </Card>
  )
}

