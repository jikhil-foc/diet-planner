"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { DietPlanCard } from "./__components/DietPlanCard";
import { DietPlanSummary } from "./__components/DietPlanSummary";
import { DietData, SectionName } from "./__components/types";

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <Box
          minHeight="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="primary" />
        </Box>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const searchParams = useSearchParams();
  const [dietData, setDietData] = useState<DietData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const weight = searchParams.get("weight");
    const height = searchParams.get("height");
    const goal = searchParams.get("goal");
    const foodStyle = searchParams.get("foodStyle");
    if (!weight || !height || !goal || !foodStyle) {
      setError("Missing input parameters.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    fetch("/api/diet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weight, height, goal, foodStyle }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch diet plan");
        const data = await res.json();
        setDietData((data.data?.diet as DietData) || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchParams]);

  const sectionNames = [
    {
      key: "breakfast",
      label: "Breakfast",
      icon: <FreeBreakfastIcon sx={{ color: "#f59e42", fontSize: 32 }} />,
    },
    {
      key: "midbreakfast",
      label: "Mid Breakfast",
      icon: <BrunchDiningIcon sx={{ color: "#fbbf24", fontSize: 32 }} />,
    },
    {
      key: "lunch",
      label: "Lunch",
      icon: <LunchDiningIcon sx={{ color: "#22c55e", fontSize: 32 }} />,
    },
    {
      key: "snacks",
      label: "Snacks",
      icon: <FreeBreakfastIcon sx={{ color: "#f59e42", fontSize: 32 }} />,
    },
    {
      key: "dinner",
      label: "Dinner",
      icon: <DinnerDiningIcon sx={{ color: "#6366f1", fontSize: 32 }} />,
    },
  ] as const satisfies ReadonlyArray<SectionName>;

  const totals = useMemo(() => {
    const initial = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    if (!dietData) return initial;
    return sectionNames.reduce((acc, { key }) => {
      const food = dietData?.[key]?.food;
      if (food) {
        acc.calories += food.calories;
        acc.protein += food.protein;
        acc.carbs += food.carbs;
        acc.fat += food.fat;
      }
      return acc;
    }, initial);
  }, [dietData, sectionNames]);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #e0f2fe 0%, #f0fff4 100%)",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 6 },
          borderRadius: 4,
          maxWidth: 800,
          width: "100%",
          backdropFilter: "blur(4px)",
        }}
      >
        {!loading && !error && dietData && (
          <DietPlanSummary
            totals={totals}
            goal={searchParams.get("goal")}
            foodStyle={searchParams.get("foodStyle")}
          />
        )}
        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" my={4}>
            <RestaurantMenuIcon
              sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
            />
            <Typography
              variant="h4"
              fontWeight={800}
              color="text.primary"
              mb={0.5}
              textAlign="center"
            >
              Your Personalized Diet Plan
            </Typography>
            <CircularProgress color="primary" />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ my: 2, textAlign: "center" }}>
            {error}
          </Alert>
        )}
        {!loading && !error && dietData && (
          <Box
            display="grid"
            gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
            gap={3}
            mt={1}
            alignItems="stretch"
            width="100%"
          >
            {sectionNames.map(({ key, label, icon }) => {
              const food = dietData?.[key]?.food;
              if (!food) return null;
              return (
                <DietPlanCard key={key} label={label} icon={icon} food={food} />
              );
            })}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
