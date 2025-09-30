import { FC } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd, null, 2)
      }}
    />
  );
};

export default StructuredData;