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
      // Done
      racerStart: {
         x: 487.4769,
         y: -444.3429,
         z: 29.0776,
      },
      // Done
      racerEnd: {
         x: 379.0154,
         y: -607.0813,
         z: 28.2689,
      },
      // Done
      policeStart: {
         x: 375.0725,
         y: -849.2308,
         z: 28.6901,
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
      },
      // Done
      racerEnd: {
         x: 487.4769,
         y: -444.3429,
         z: 29.0776,
      },
      policeStart: {
         x: 1200.12,
         y: 500.12,
         z: 45.11,
      },
   },
];
