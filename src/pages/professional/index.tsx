import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /professional/projects
    router.push('/professional/projects');
  }, [router]);

  return null; // You can return null or a loading spinner
};

export default IndexPage;
