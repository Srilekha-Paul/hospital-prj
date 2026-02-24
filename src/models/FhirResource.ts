import mongoose, { Schema, Document } from "mongoose";

export interface IFhirResource extends Document {
  resourceType: string;
  resourceId: string;
  data: object;
}

const FhirSchema: Schema = new Schema(
  {
    resourceType: { type: String, required: true, index: true },
    resourceId: { type: String, required: true, unique: true },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.FhirResource ||
  mongoose.model<IFhirResource>("FhirResource", FhirSchema);