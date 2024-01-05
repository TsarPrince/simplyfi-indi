export const resolveImageURL = (url: string) => {
  if (url.startsWith("http")) {
    return url;
  }
  const bucketURL = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL;
  return bucketURL + url;
};
