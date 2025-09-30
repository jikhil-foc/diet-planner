"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Avatar from "@mui/material/Avatar";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InputAdornment from "@mui/material/InputAdornment";

export default function Home() {
  const router = useRouter();
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [goal, setGoal] = useState("Weight Loss");
  const [foodStyle, setFoodStyle] = useState("Kerala");
  const weightInvalid = isNaN(weight) || weight <= 0 || weight > 500;
  const heightInvalid = isNaN(height) || height <= 0 || height > 300;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      weight: weight.toString(),
      height: height.toString(),
      goal,
      foodStyle,
    }).toString();
    router.push(`/results?${params}`);
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0fff4 100%)",
        px: 2,
        py: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 4,
          maxWidth: 520,
          width: "100%",
          backdropFilter: "blur(6px)",
          transition: "box-shadow .2s ease",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar
            sx={{ bgcolor: "primary.main", width: 56, height: 56, mb: 1 }}
          >
            <FitnessCenterIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h4"
            fontWeight={800}
            color="text.primary"
            mb={0.5}
            textAlign="center"
          >
            Find Your Diet Plan
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            textAlign="center"
          >
            Personalized nutrition for your goals & taste
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            inputProps={{ min: 1, max: 500, step: 0.1 }}
            required
            fullWidth
            variant="outlined"
            error={weightInvalid}
            helperText={
              weightInvalid
                ? "Enter a valid weight between 1 and 500 kg"
                : "Your current body weight"
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
          <TextField
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            inputProps={{ min: 1, max: 300, step: 0.1 }}
            required
            fullWidth
            variant="outlined"
            error={heightInvalid}
            helperText={
              heightInvalid
                ? "Enter a valid height between 1 and 300 cm"
                : "Your height in centimeters"
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
          <FormControl fullWidth required>
            <InputLabel id="goal-label">Goal</InputLabel>
            <Select
              labelId="goal-label"
              value={goal}
              label="Goal"
              onChange={(e) => setGoal(e.target.value)}
            >
              <MenuItem value="Weight Loss">Weight Loss</MenuItem>
              <MenuItem value="Weight Gain">Weight Gain</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth required>
            <InputLabel id="food-style-label">Food Style</InputLabel>
            <Select
              labelId="food-style-label"
              value={foodStyle}
              label="Food Style"
              onChange={(e) => setFoodStyle(e.target.value)}
            >
              <MenuItem value="Kerala">Kerala</MenuItem>
              <MenuItem value="North Indian">North Indian</MenuItem>
              <MenuItem value="Continental">Continental</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #2563eb 0%, #22d3ee 100%)",
              color: "white",
              fontWeight: 700,
              borderRadius: 2,
              py: 1.5,
              mt: 1,
              boxShadow: 3,
              textTransform: "none",
              fontSize: "1.1rem",
              "&:hover": {
                background: "linear-gradient(90deg, #1d4ed8 0%, #06b6d4 100%)",
              },
            }}
            fullWidth
            disabled={weightInvalid || heightInvalid}
          >
            Find Diet Plans
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
