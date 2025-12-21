import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const timelineSchema = new Schema(
  {
    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
      index: true, // Good for sorting/querying
    },
    entitle: {
      type: String,
      required: [true, "English Title is required"], // clearer error msg
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"], // Fixed
    },
    zntitle: {
      type: String,
      required: [true, "Chinese Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"], // Fixed
    },
    endescription: {
      type: String,
      required: [true, "English Description is required"],
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"], // Fixed
    },
    zndescription: {
      type: String,
      required: [true, "Chinese Description is required"],
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"], // Fixed
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

timelineSchema.virtual("formattedDate").get(function () {
  return this.eventDate ? this.eventDate.toISOString() : null;
});

const Timeline = models.Timeline || model("Timeline", timelineSchema);

export default Timeline;