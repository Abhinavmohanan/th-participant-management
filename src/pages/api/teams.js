import { supabaseClient } from "@/utils/supabaseClient";

export default async (req, res) => {
  if (req.method === "GET") {
    const teams = await supabaseClient
      .from("technohack-users")
      .select("*,technohack-teams(*)");
    res.status(200).json(teams.data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
