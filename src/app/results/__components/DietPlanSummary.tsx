import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Button from "@mui/material/Button";

type Totals = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type DietPlanSummaryProps = {
  totals: Totals;
  goal: string | null;
  foodStyle: string | null;
};

export function DietPlanSummary({
  totals,
  goal,
  foodStyle,
}: DietPlanSummaryProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <RestaurantMenuIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
      <Typography
        variant="h4"
        fontWeight={800}
        color="text.primary"
        mb={0.5}
        textAlign="center"
      >
        Your Personalized Diet Plan
      </Typography>
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
      <Box display="flex" gap={1} alignItems="center">
        <Typography variant="subtitle2" color="text.secondary">
          Goal: {goal}
        </Typography>
        <Typography variant="subtitle2" color="text.disabled">
          •
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Style: {foodStyle}
        </Typography>
      </Box>
      <Box mt={2}>
        <Button href="/" variant="outlined" size="small">
          Back
        </Button>
      </Box>
    </Box>
  );
}
