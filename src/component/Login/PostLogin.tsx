import { getToken } from "@/api/auth";
import { userSchema } from "@/model/user";
import { authAtom } from "@/store";
import { parseJwt } from "@/util/jwt";
import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function PostLogin() {
  const { tempId } = useParams();
  const [_, setAuth] = useAtom(authAtom);
  const navigate = useNavigate();
  useQuery({
    queryKey: ["post-login", tempId],
    queryFn: async () => {
      if (tempId) {
        const response = await getToken(tempId);
        if (response) {
          const result = userSchema.safeParse(parseJwt(response.token));
          if (result.success) {
            navigate({ pathname: "//" });
            localStorage.setItem("token", response.token);
            setAuth({
              user: result.data,
              token: response.token,
            });
          } else {
            throw new Error("Invalid token received.");
          }
        }
      }
    },
  });
  return null;
}
