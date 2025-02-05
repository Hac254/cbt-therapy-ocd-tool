interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>
      {description && <p className="text-lg text-muted-foreground max-w-[600px]">{description}</p>}
    </div>
  )
}

