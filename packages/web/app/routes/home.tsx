import type { Route } from './+types/home';
import { SITE_TITLE } from '~/config';

export function meta({}: Route.MetaArgs) {
  return [{ title: SITE_TITLE }, { name: 'description', content: `Welcome to ${SITE_TITLE}` }];
}

export default function Home() {
  return (
    <div className="">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <p>hoge</p>
    </div>
  );
}
