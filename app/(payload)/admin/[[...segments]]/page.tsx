import { RootPage, generatePageMetadata } from '@payloadcms/next/views';
import { importConfig } from 'payload/node';
import configPromise from '@/payload.config';

type Args = {
  params: {
    segments: string[];
  };
  searchParams: { [key: string]: string | string[] };
};

export const generateMetadata = ({ params, searchParams }: Args) =>
  generatePageMetadata({ config: configPromise, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: configPromise, params, searchParams });

export default Page;
