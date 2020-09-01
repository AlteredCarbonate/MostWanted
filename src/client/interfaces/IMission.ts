export interface IMission {
   id: number;
   missionName: string;
   previewPoint: {
      x: number;
      y: number;
      z: number;
      rx: number;
      ry: number;
      rz: number;
      fov: number;
   };
   racerStart: {
      x: number;
      y: number;
      z: number;
   };
   policeStart: {
      x: number;
      y: number;
      z: number;
   };
}
