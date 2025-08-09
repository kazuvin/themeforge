import { SITE_TITLE } from '~/config';
import { OklchGenerator } from '~/features/oklch-generator';

/* eslint react-refresh/only-export-components: 0 */
export function meta() {
  return [{ title: SITE_TITLE }, { name: 'description', content: `Welcome to ${SITE_TITLE}` }];
}

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <OklchGenerator />
    </div>
  );
}
