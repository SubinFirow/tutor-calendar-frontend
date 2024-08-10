import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import EventForm from "./EventForm";
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from "../service";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("create");
  const initialValues = {
    title: "",
    description: "",
    participants: [],
    date: "",
    time: "",
    duration: "",
    sessionNotes: "",
  };
  const [activeItem, setActiveItem] = useState(initialValues);

  const fetchItems = async () => {
    try {
      setEvents(await getItems());
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createItem(data).then(toast.success("Submitted"));
    } catch (error) {
      toast.error(error);
    }
  };

  const handleEdit = async (event) => {
    try {
      await updateItem(event).then(toast.success("Updated"));
    } catch (error) {
      toast.error(error);
    }
  };

  const getEventById = async (event) => {
    try {
      const id = event._def.extendedProps._id;
      const data = await getItemById(id);
      setActiveItem({ ...data, date: moment(data.date).format("yyyy-MM-DD") });
      setOpen(true);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleDelete = async () => {
    setOpen(false);
    await deleteItem(activeItem._id).then(toast.success("Deleted"));
  };

  const handleSubmit = (data) => {
    action === "create" ? handleCreate(data) : handleEdit(data);
    setOpen(false);
    setAction("create");
  };

  const handleDateClick = (arg) => {
    setAction("create");
    setActiveItem({ ...initialValues, date: arg.dateStr });
    setOpen(true);
  };

  const handleEventClick = (event) => {
    setAction("edit");
    getEventById(event);
  };

  const handleClose = () => {
    setAction("create");
    setOpen(false);
  };

  const renderEventContent = (eventInfo) => {
    const formattedDate = moment(eventInfo.event.time).format("LL");
    const formattedTime = moment(eventInfo.event.time).format("LT");
    return (
      <Box
        onClick={() => handleEventClick(eventInfo.event)}
        sx={{
          bgcolor: "#d9d9d9",
          width: "100%",
          paddingY: "1px",
          paddingX: "10px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {eventInfo.event.title}
        </Typography>
        <Typography variant="caption">{formattedDate}</Typography>
        <Typography variant="caption">{formattedTime}</Typography>
      </Box>
    );
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Box>
      <Toaster />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        eventContent={renderEventContent}
        displayEventTime
      />

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
            }}
          >
            <Typography variant="h5">Create Event</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {action === "edit" && (
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  sx={{
                    bgcolor: "#990000",
                    "&:hover": { bgcolor: "#cc0000" },
                  }}
                >
                  Delete
                </Button>
              )}
              <Button
                onClick={handleClose}
                variant="contained"
                sx={{
                  bgcolor: "#333333",
                  "&:hover": { bgcolor: "#595959" },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
          <EventForm
            onSubmit={handleSubmit}
            activeItem={activeItem}
            action={action}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Calendar;
