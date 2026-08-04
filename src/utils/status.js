const STATUS_META = {
  Pending: {
    label: "Pending",
    color: "warning",
  },
  Assigned: {
    label: "Assigned",
    color: "info",
  },
  "In Progress": {
    label: "In Progress",
    color: "secondary",
  },
  Resolved: {
    label: "Resolved",
    color: "success",
  },
};

export const getStatusMeta = (status) => {
  return STATUS_META[status] ?? {
    label: status || "Unknown",
    color: "default",
  };
};
