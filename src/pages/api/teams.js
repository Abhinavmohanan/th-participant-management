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
    console.log(req.body);
    const { data, error } = await supabaseClient
      .from("technohack-teams")
      .update({ comments: req.body[0].col6 })
      .eq("id", req.body[0].id);
    if (error) {
      console.log(error);
    }
    res.status(200).json(data);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
