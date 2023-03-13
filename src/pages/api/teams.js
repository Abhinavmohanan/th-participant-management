import { supabaseClient } from "@/utils/supabaseClient";

export default async (req, res) => {
  if (req.method === "GET") {
    const teams = await supabaseClient
      .from("technohack-users")
      .select("*,technohack-teams(*)");
    res.status(200).json(teams.data);
  } else if (req.method === "PUT") {
    const status = req.body.isSelected;
    const { data, error } = await supabaseClient
      .from("technohack-teams")
      .update({ isSelected: status })
      .eq("id", req.body.id);
    if (error) {
      console.log(error);
    }
    res.status(200).json(data);
  } else if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      const { data, error } = await supabaseClient
        .from("technohack-teams")
        .update({ comments: req.body[i].col6 })
        .eq("id", req.body[i].id);

      if (error) {
        console.log(error);
      }
    }
    res.status(200).json("success");
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
