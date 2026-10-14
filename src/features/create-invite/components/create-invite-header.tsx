import { CREATE_INVITE_HEADER } from '@/src/features/create-invite/model/copy'
import { Link } from '@/src/shared/ui'

export function CreateInviteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link
          href="/v2"
          variant="nav"
          className="font-serif text-2xl font-normal lowercase no-underline hover:no-underline"
        >
          {CREATE_INVITE_HEADER.brandLabel}
        </Link>
        <p className="hidden text-sm leading-6 text-muted-foreground sm:block">
          {CREATE_INVITE_HEADER.draftStatus}
        </p>
      </div>
    </header>
  )
}
