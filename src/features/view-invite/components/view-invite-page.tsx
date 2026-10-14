import { InviteRenderer, type InviteTemplateData } from '@/src/features/invite-templates'

type ViewInvitePageProps = {
  data: InviteTemplateData
}

export function ViewInvitePage({ data }: ViewInvitePageProps) {
  return <InviteRenderer data={data} />
}
