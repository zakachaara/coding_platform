import { Suspense } from 'react';
import AccessPending from './AccessPending';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading access status...</div>}>
      <AccessPending />
    </Suspense>
  );
}
