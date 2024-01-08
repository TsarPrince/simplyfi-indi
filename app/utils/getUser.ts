import supabase from "@/lib/supabase";

const getUser = async (pathname: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

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

const getUserIdSync = () => {
  const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID;
  if (typeof window !== "undefined") {
    const authToken = localStorage.getItem(
      `sb-${supabaseProjectId}-auth-token`
    );

    // hopefully there is no user with id = ""
    // not returning null as includes() requires string type
    if (!authToken) {
      return "";
    }
    const user = JSON.parse(authToken).user;
    if (!user || !user.id) {
      return "";
    }
    return user.id as string;
  } else {
    return "";
  }
};

export default getUser;
export { getUserIdSync };
