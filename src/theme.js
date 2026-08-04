import { alpha, createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTokens = {
  light: {
    background: "#f3f7fb",
    paper: "rgba(255, 255, 255, 0.82)",
    paperSolid: "#ffffff",
    textPrimary: "#0f172a",
    textSecondary: "#475569",
    border: "rgba(148, 163, 184, 0.24)",
    shadow: "rgba(15, 23, 42, 0.08)",
    primary: "#0f766e",
    primaryDark: "#115e59",
    secondary: "#2457d6",
    accent: "#d97706",
    success: "#15803d",
    warning: "#d97706",
    error: "#dc2626",
  },
  dark: {
    background: "#07111f",
    paper: "rgba(10, 18, 34, 0.82)",
    paperSolid: "#0b1320",
    textPrimary: "#e5eefc",
    textSecondary: "#9db0d0",
    border: "rgba(148, 163, 184, 0.18)",
    shadow: "rgba(0, 0, 0, 0.28)",
    primary: "#39c5b7",
    primaryDark: "#22a39a",
    secondary: "#7c9cff",
    accent: "#f59e0b",
    success: "#22c55e",
    warning: "#f59e0b",
    error: "#fb7185",
  },
};

export const createAppTheme = (mode = "light") => {
  const token = baseTokens[mode] ?? baseTokens.light;

  let theme = createTheme({
    palette: {
      mode,
      primary: {
        main: token.primary,
        dark: token.primaryDark,
        contrastText: "#ffffff",
      },
      secondary: {
        main: token.secondary,
      },
      success: {
        main: token.success,
      },
      warning: {
        main: token.warning,
      },
      error: {
        main: token.error,
      },
      background: {
        default: token.background,
        paper: token.paperSolid,
      },
      text: {
        primary: token.textPrimary,
        secondary: token.textSecondary,
      },
      divider: token.border,
    },
    shape: {
      borderRadius: 18,
    },
    typography: {
      fontFamily:
        '"Manrope", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
      h1: {
        fontFamily: '"Space Grotesk", "Manrope", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.04em",
      },
      h2: {
        fontFamily: '"Space Grotesk", "Manrope", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.035em",
      },
      h3: {
        fontFamily: '"Space Grotesk", "Manrope", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.03em",
      },
      h4: {
        fontFamily: '"Space Grotesk", "Manrope", sans-serif',
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },
      h5: {
        fontFamily: '"Space Grotesk", "Manrope", sans-serif',
        fontWeight: 700,
      },
      h6: {
        fontFamily: '"Space Grotesk", "Manrope", sans-serif',
        fontWeight: 700,
      },
      button: {
        textTransform: "none",
        fontWeight: 700,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            height: "100%",
          },
          body: {
            minHeight: "100%",
            margin: 0,
            backgroundColor: token.background,
            backgroundImage:
              mode === "dark"
                ? "radial-gradient(circle at top left, rgba(57, 197, 183, 0.18), transparent 34%), radial-gradient(circle at top right, rgba(124, 156, 255, 0.18), transparent 30%), linear-gradient(180deg, #08111d 0%, #07111f 100%)"
                : "radial-gradient(circle at top left, rgba(15, 118, 110, 0.16), transparent 34%), radial-gradient(circle at top right, rgba(36, 87, 214, 0.12), transparent 30%), linear-gradient(180deg, #f6fbff 0%, #eef4fa 100%)",
            color: token.textPrimary,
            fontFeatureSettings: '"kern" 1, "liga" 1, "cv11" 1',
          },
          "#root": {
            minHeight: "100vh",
          },
          "*": {
            boxSizing: "border-box",
          },
          "::selection": {
            backgroundColor: alpha(token.primary, 0.22),
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            border: `1px solid ${token.border}`,
            boxShadow: `0 24px 60px ${token.shadow}`,
            backdropFilter: "blur(18px)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            border: `1px solid ${token.border}`,
            boxShadow: `0 24px 60px ${token.shadow}`,
            backgroundImage: "none",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            paddingInline: 18,
            paddingBlock: 10,
          },
          contained: {
            boxShadow: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 700,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
          fullWidth: true,
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            backgroundColor:
              mode === "dark"
                ? "rgba(15, 23, 42, 0.7)"
                : "rgba(255, 255, 255, 0.88)",
            transition: "border-color 160ms ease, box-shadow 160ms ease",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: alpha(token.primary, 0.6),
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: token.primary,
              borderWidth: 1.5,
              boxShadow: `0 0 0 4px ${alpha(token.primary, 0.14)}`,
            },
          },
          notchedOutline: {
            borderColor: token.border,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderBottom: `1px solid ${token.border}`,
            backdropFilter: "blur(18px)",
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);
  return theme;
};
