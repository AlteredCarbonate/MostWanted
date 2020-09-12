import * as mongoose from "mongoose";

export const missionSchema = new mongoose.Schema({
   index: Number,
   missionName: String,
   previewPoint: {
      x: Number,
      y: Number,
      z: Number,
      rx: Number,
      ry: Number,
      rz: Number,
      fov: Number,
   },
   racerStart: {
      x: Number,
      y: Number,
      z: Number,
      rot: Number,
   },
   racerEnd: {
      x: Number,
      y: Number,
      z: Number,
      rot: Number,
   },
   policeStart: {
      x: Number,
      y: Number,
      z: Number,
      rot: Number,
   },
});
