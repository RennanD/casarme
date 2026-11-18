import { HomeImage } from "@/src/features/home/components/home-image";
import {
  getTemplateCreateHref,
  getTemplateDemoHref,
  type CatalogTemplate,
} from "@/src/features/home/model/catalog";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  Link,
} from "@/src/shared/ui";

type TemplateCardProps = {
  template: CatalogTemplate;
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article className="flex h-full flex-1 flex-col">
      <Card className="shadow-elevated flex h-full flex-1 flex-col gap-3 overflow-hidden rounded-lg border border-border/70 bg-card p-2.5 sm:gap-4 sm:p-3">
        <figure className="relative aspect-[7/6] shrink-0 overflow-hidden rounded-md bg-secondary/40">
          <HomeImage
            src={template.imagePath}
            alt={`Convite ${template.name}, tema ${template.styleLabel}, exibido em celular e papel`}
            fill
            className="image-outline object-cover"
            loading="lazy"
            sizes="(max-width: 359px) 100vw, 50vw"
          />
        </figure>

        <CardHeader className="items-center gap-1 px-1 py-0 text-center">
          <CardTitle className="font-serif text-lg font-medium leading-tight">
            {template.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{template.styleLabel}</p>
          <p className="pt-1 font-serif text-xl font-semibold tabular-nums tracking-tight text-foreground">
            {template.displayPrice}
          </p>
        </CardHeader>

        <CardFooter className="mt-auto grid shrink-0 grid-cols-1 gap-2 border-t border-border/60 px-0 pb-0 pt-3 sm:grid-cols-2">
          <Button
            variant="outline"
            asChild
            id={`btn-view-demo-${template.slug}`}
            className="h-10 w-full px-2 text-xs sm:text-sm"
          >
            <Link
              href={getTemplateDemoHref(template.slug)}
              className="no-underline hover:no-underline"
              aria-label={`Ver preview do convite ${template.name}`}
            >
              Ver preview
            </Link>
          </Button>
          <Button
            asChild
            id={`select-template-invite-${template.slug}`}
            className="h-10 w-full px-2 text-xs sm:text-sm"
          >
            <Link
              href={getTemplateCreateHref(template.slug)}
              className="no-underline hover:no-underline"
              aria-label={`Criar convite ${template.name}`}
            >
              Criar convite <span aria-hidden>→</span>
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
}
