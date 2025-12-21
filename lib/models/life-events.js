import mongoose from "mongoose";

const LifeEventSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },

    event_type: { type: String, default: "other", index: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },

    start_date: { type: String, default: "" },
    end_date: { type: String, default: "" },

    location: { type: String, default: "" },
    organization: { type: String, default: "" },
    organization_link: { type: String, default: "" },

    image_url: { type: String, default: "" },

    highlights: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    paper_status: {
      type: String,
      enum: ["not_published", "working", "published"],
      default: "not_published",
    },
    paper_title: { type: String, default: "" },
    paper_published: { type: String, default: "" },

    pinned: { type: Boolean, default: false, index: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const LifeEvent =
  mongoose.models.LifeEvent || mongoose.model("LifeEvent", LifeEventSchema);
