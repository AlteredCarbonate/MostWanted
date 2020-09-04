import { IMission } from "../interfaces/IMission";

export const missions: Array<IMission> = [
   {
      id: 0,
      missionName: "Example1",
      previewPoint: {
         x: 1200.12,
         y: 500.12,
         z: 45.11,
         rx: 60,
         ry: 60,
         rz: 60,
         fov: 60,
      },
      racerStart: {
         x: 521.472,
         y: -397.6088,
         z: 31.5377,
         rot: 2.4737,
      },
      racerEnd: {
         x: 375.9561,
         y: -610.444,
         z: 28.5385,
         rot: 2.5726,
      },
      policeStart: {
         x: 422.2549,
         y: -849.8373,
         z: 29.0439,
         rot: 1.5337,
      },
   },
   {
      id: 1,
      missionName: "Example2",
      previewPoint: {
         x: 1200.12,
         y: 500.12,
         z: 45.11,
         rx: 60,
         ry: 60,
         rz: 60,
         fov: 60,
      },
      racerStart: {
         x: 1200.12,
         y: 500.12,
         z: 45.11,
         rot: 50,
      },
      // Done
      racerEnd: {
         x: 487.4769,
         y: -444.3429,
         z: 29.0776,
         rot: 50,
      },
      policeStart: {
         x: 1200.12,
         y: 500.12,
         z: 45.11,
         rot: 50,
      },
   },
];
