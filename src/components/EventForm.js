import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Autocomplete, Chip } from "@mui/material";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  date: Yup.string().required("Date is required"),
  time: Yup.string().required("Time is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be positive"),
  sessionNotes: Yup.string(),
  participants: Yup.array()
    .of(
      Yup.string()
        .email("Invalid email address") // Validates that each entry is a valid email
        .required("Email is required")
    )
    .min(1, "At least one participant is required"), // Optional: Ensures at least one participant is added
});

const EventForm = ({ onSubmit, activeItem, action }) => {
  const formik = useFormik({
    initialValues: activeItem,
    validationSchema,
    onSubmit: (values) => {
      const { date, time } = values;

      const dateTime = new Date(`${date}T${time}`);

      const year = dateTime.getFullYear();
      const month = String(dateTime.getMonth() + 1).padStart(2, "0");
      const day = String(dateTime.getDate()).padStart(2, "0");
      const hours = String(dateTime.getHours()).padStart(2, "0");
      const minutes = String(dateTime.getMinutes()).padStart(2, "0");
      const seconds = String(dateTime.getSeconds()).padStart(2, "0");

      const offset = dateTime.getTimezoneOffset();
      const offsetHours = String(Math.abs(Math.floor(offset / 60))).padStart(
        2,
        "0"
      );
      const offsetMinutes = String(Math.abs(offset % 60)).padStart(2, "0");
      const offsetSign = offset > 0 ? "-" : "+";

      const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${offsetSign}${offsetHours}:${offsetMinutes}`;

      onSubmit({ ...values, date: formattedDateTime });
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          required
          fullWidth
        />
        <Autocomplete
          fullWidth
          multiple
          freeSolo
          options={formik.values.participants}
          value={formik.values.participants}
          onChange={(event, newValue) => {
            formik.setFieldValue("participants", newValue);
          }}
          onBlur={formik.handleBlur}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Participants"
              placeholder="Type and press enter"
              error={
                formik.touched.participants &&
                Boolean(formik.errors.participants)
              }
              helperText={
                formik.touched.participants && formik.errors.participants
              }
            />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.date && Boolean(formik.errors.date)}
          helperText={formik.touched.date && formik.errors.date}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Time"
          name="time"
          type="time"
          value={formik.values.time}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.time && Boolean(formik.errors.time)}
          helperText={formik.touched.time && formik.errors.time}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Duration (hours)"
          name="duration"
          type="number"
          value={formik.values.duration}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.duration && Boolean(formik.errors.duration)}
          helperText={formik.touched.duration && formik.errors.duration}
          required
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <TextField
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          multiline
          rows={4}
          fullWidth
        />
        <TextField
          label="Session Notes"
          name="sessionNotes"
          value={formik.values.sessionNotes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.sessionNotes && Boolean(formik.errors.sessionNotes)
          }
          helperText={formik.touched.sessionNotes && formik.errors.sessionNotes}
          multiline
          rows={4}
          fullWidth
        />
      </Box>

      <Button
        variant="contained"
        sx={{ bgcolor: "#333333", "&:hover": { bgcolor: "#595959" } }}
        type="submit"
      >
        {action === "create" ? "Create Event" : "Update Event"}
      </Button>
    </Box>
  );
};

export default EventForm;
