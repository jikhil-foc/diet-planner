import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

type Food = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type DietPlanCardProps = {
  label: string;
  icon: ReactNode;
  food: Food;
};

export function DietPlanCard({ label, icon, food }: DietPlanCardProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: 6,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(120deg, #f0fdfa 0%, #e0e7ff 100%)",
          transition: "transform 0.18s, box-shadow 0.18s",
          height: "100%",
          width: "100%",
          minHeight: 240,
          "&:hover": {
            transform: "translateY(-6px) scale(1.03)",
            boxShadow: 12,
            background: "linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)",
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
              <Typography variant="h6" fontWeight={700} color="#f59e42">
                {food.calories}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Protein
              </Typography>
              <Typography variant="h6" fontWeight={700} color="#22c55e">
                {food.protein}g
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Carbs
              </Typography>
              <Typography variant="h6" fontWeight={700} color="#3b82f6">
                {food.carbs}g
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Fat
              </Typography>
              <Typography variant="h6" fontWeight={700} color="#f43f5e">
                {food.fat}g
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
