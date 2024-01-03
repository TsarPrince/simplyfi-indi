import supabase from "@/lib/supabase";

const getUser = async (pathname: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw Error(error.message);

  // if !user => redirect to signIn
  if (!user) {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}${pathname}`,
      },
    });
    throw new Error("Please login to continue");
  }

  return user;
};

export default getUser;
