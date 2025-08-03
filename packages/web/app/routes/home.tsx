import { Button } from '~/components/ui';
import type { Route } from './+types/home';
import { SITE_TITLE } from '~/config';
import { Heading } from '~/components/typography';

export function meta({}: Route.MetaArgs) {
  return [{ title: SITE_TITLE }, { name: 'description', content: `Welcome to ${SITE_TITLE}` }];
}

export default function Home() {
  return (
    <div className="px-6 lg:px-8">
      <Button variant="outline" size="sm">
        hoge
      </Button>
    </div>
  );
}
