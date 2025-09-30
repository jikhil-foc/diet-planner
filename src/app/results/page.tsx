"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// using CSS grid via Box for layout to avoid Grid type issues
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import BrunchDiningIcon from "@mui/icons-material/BrunchDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

type Food = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type DietSection = {
  food: Food;
};

type DietKey = "breakfast" | "midbreakfast" | "lunch" | "snacks" | "dinner";

type DietData = Partial<Record<DietKey, DietSection>>;

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
  ] as const satisfies ReadonlyArray<{
    key: DietKey;
    label: string;
    icon: ReactNode;
  }>;

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
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
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
          {!loading && !error && dietData && (
            <Box display="flex" gap={2} alignItems="center" mt={1}>
              <Typography variant="body2" color="text.secondary">
                Total Calories: {totals.calories}
              </Typography>
              <Typography variant="body2" color="text.disabled">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Protein: {totals.protein}g
              </Typography>
              <Typography variant="body2" color="text.disabled">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Carbs: {totals.carbs}g
              </Typography>
              <Typography variant="body2" color="text.disabled">
                •
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Fat: {totals.fat}g
              </Typography>
            </Box>
          )}
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              Goal: {searchParams.get("goal")}
            </Typography>
            <Typography variant="subtitle2" color="text.disabled">
              •
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Style: {searchParams.get("foodStyle")}
            </Typography>
          </Box>
          <Box mt={2}>
            <Button href="/" variant="outlined" size="small">
              Back
            </Button>
          </Box>
        </Box>
        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" my={4}>
            <CircularProgress color="primary" />
            <Typography variant="body1" color="text.secondary" mt={2}>
              Loading...
            </Typography>
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
                <Box key={key} sx={{ display: "flex" }}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      boxShadow: 6,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      background:
                        "linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%)",
                      transition: "transform 0.18s, box-shadow 0.18s",
                      height: "100%",
                      width: "100%",
                      minHeight: 240,
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.03)",
                        boxShadow: 12,
                        background:
                          "linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)",
                      },
                      p: 2,
                    }}
                  >
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        height: "100%",
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        {icon}
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          color="primary.main"
                          gutterBottom
                        >
                          {label}
                        </Typography>
                      </Box>
                      <Divider sx={{ mb: 2 }} />
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                        mb={1}
                        sx={{ minHeight: 48 }}
                      >
                        {food.name}
                      </Typography>
                      <Box
                        display="flex"
                        flexDirection="row"
                        gap={3}
                        flexWrap="wrap"
                        mt={1}
                        justifyContent="flex-start"
                      >
                        <Box textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Calories
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#f59e42"
                          >
                            {food.calories}
                          </Typography>
                        </Box>
                        <Box textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Protein
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#22c55e"
                          >
                            {food.protein}g
                          </Typography>
                        </Box>
                        <Box textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Carbs
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#3b82f6"
                          >
                            {food.carbs}g
                          </Typography>
                        </Box>
                        <Box textAlign="center">
                          <Typography variant="body2" color="text.secondary">
                            Fat
                          </Typography>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#f43f5e"
                          >
                            {food.fat}g
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        )}
      </Paper>
    </Box>
  );
}
