import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import { ClockLoader } from "react-spinners";
import Head from "next/head";
import TeamMembersModal from "@/components/TeamMembersModal/TeamMembersModal";
import IdeaDialog from "@/components/IdeaDialog/IdeaDialog";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [variable, setVariable] = useState(true);
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState();
  const [idea, setIdea] = useState();
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [users, setUsers] = useState([]);
  const [teamId, setTeamId] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  useEffect(() => {
    getTeams();
  }, [variable]);

  const getTeams = async () => {
    const response = await axios.get("/api/teams");
    setUsers(response.data);
    findDistinctTeamsFromUsers(response.data);
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const findDistinctTeamsFromUsers = (users) => {
    const distinctTeams = users
      .map((user) => user["technohack-teams"])
      .flat()
      .filter((team) => team.id !== null)
      .filter(
        (team, index, self) => index === self.findIndex((t) => t.id === team.id)
      );
    setTeams(distinctTeams);
  };

  const updateToTeamSelected = async (teamId) => {
    const { data, error } = await axios.put("/api/teams", {
      id: teamId,
      isSelected: true,
    });
    if (error) {
      console.log(error);
    } else {
      setVariable(!variable);
    }
  };

  const updateToTeamUnSelected = async (teamId) => {
    const { data, error } = await axios.put("/api/teams", {
      id: teamId,
      isSelected: false,
    });
    if (error) {
      console.log(error);
    } else {
      setVariable(!variable);
    }
  };

  const isSelected = (teamId) => {
    return teams.find((team) => team.id === teamId).isSelected;
  };

  const Modal = () => {
    return (
      <TeamMembersModal
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        teamId={teamId}
        teamName={teams.find((team) => team.id === teamId).name}
        users={users}
      />
    );
  };

  const rows = teams.map((team) => {
    return {
      id: team.id,
      name: team.name,
      idea: team.idea,
      suggestions: team.suggestions,
      tracks: team.tracks,
      isSelected: team.isSelected,
    };
  });

  const columns = [
    { field: "id", headerName: "Team ID", width: 100 },
    { field: "col1", headerName: "Team Name", width: 200 },
    { field: "col4", headerName: "Tracks", width: 500 },
    {
      field: "col2",
      headerName: "Idea",
      width: 200,
      renderCell: (params) =>
        params.row.col2 === null || params.row.col2 === "" ? (
          "Nil"
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setIsSuggestion(false);
              setTeamName(params.row.col1);
              setIdea(params.row.col2);
              setOpen1(true);
            }}
          >
            View Idea
          </Button>
        ),
    },
    {
      field: "col3",
      headerName: "Suggestions",
      width: 130,
      renderCell: (params) =>
        params.row.col2 === null || params.row.col2 === "" ? (
          "Nil"
        ) : (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setIsSuggestion(true);
              setTeamName(params.row.col1);
              setIdea(params.row.col3);
              setOpen1(true);
            }}
          >
            View
          </Button>
        ),
    },
    {
      field: "Edit",
      headerName: "View",
      width: "130",
      renderCell: (props) => (
        <Button
          variant="outlined"
          onClick={() => {
            setTeamId(props.row.id);
            setOpen(true);
          }}
        >
          View Team
        </Button>
      ),
    },
    {
      field: "col5",
      headerName: "Selected",
      width: "100",
      renderCell: (props) =>
        isSelected(props.row.id) ? (
          <Button
            variant="contained"
            onClick={() => updateToTeamUnSelected(props.row.id)}
          >
            Yes
          </Button>
        ) : (
          <Button
            variant="contained"
            color="error"
            onClick={() => updateToTeamSelected(props.row.id)}
          >
            No
          </Button>
        ),
    },
  ];

  if (loading)
    return (
      <>
        <Head>
          <title>TechnoHack Dashboard</title>
        </Head>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ClockLoader color="#3f51b5" size={40} />
        </div>
      </>
    );
  return (
    <>
      <Head>
        <title>TechnoHack Dashboard</title>
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          TechnoHack Dashboard
        </h1>
        <div style={{}}>
          <h3
            style={{
              textAlign: "center",
            }}
          >
            * Use Landscape Mode while Printing.
          </h3>
          <h3
            style={{
              textAlign: "center",
            }}
          >
            * Click on Button to Change Selection Status.
          </h3>
          <div
            style={{
              display: "flex",
              height: "100%",
              flexGrow: 1,
              width: "90vw",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={rows.map((row) => {
                  return {
                    id: row.id,
                    col1: row.name,
                    col2: row.idea,
                    col3: row.suggestions,
                    col4: row.tracks,
                    col5: row.isSelected,
                  };
                })}
                components={{
                  Toolbar: GridToolbar,
                }}
                columns={columns}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,

                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                autoHeight
              />
            </div>
          </div>
        </div>
      </div>
      {teamId && <Modal teamId={teamId} />}
      {teamName && (
        <IdeaDialog
          open={open1}
          isSuggestion={isSuggestion}
          setOpen={setOpen1}
          handleClose={handleClose1}
          teamName={teamName}
          idea={idea}
        />
      )}
    </>
  );
}
