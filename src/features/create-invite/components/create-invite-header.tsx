import { CREATE_INVITE_HEADER } from '@/src/features/create-invite/model/copy'
import { Link } from '@/src/shared/ui'

export function CreateInviteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 lg:px-28">
        <Link
          href="/v2"
          variant="nav"
          className="font-serif text-2xl font-normal lowercase no-underline hover:no-underline"
        >
          {CREATE_INVITE_HEADER.brandLabel}
        </Link>
        <p className="body-sm hidden text-muted-foreground sm:block">
          {CREATE_INVITE_HEADER.draftStatus}
        </p>
      </div>
    </header>
  )
}
