import type { GetServerSideProps } from 'next';

interface LegacyPageProps {
  renderedAt: string;
}

export const getServerSideProps: GetServerSideProps<LegacyPageProps> = async () => {
  return {
    props: {
      renderedAt: new Date().toISOString(),
    },
  };
};

export default function LegacyPage({ renderedAt }: LegacyPageProps) {
  return (
    <div>
      <h1>Legacy Pages Router</h1>
      <p>
        This page uses the Pages Router with <code>getServerSideProps</code>.
        It coexists alongside App Router pages in the same project.
      </p>
      <p>Server-rendered at: {renderedAt}</p>
      <p>
        <a href="/">Back to App Router Home</a>
      </p>
    </div>
  );
}
