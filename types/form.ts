 export type MaterialItem = {
    material: string;
    section:string;
    note:string; 
};

export type FormDataType = {
  customer: {
    companyName: string;
    projectName: string;
    personInCharge: string;
    differentCompany: string;
    phone: string;
    note: string;
  };

  application: {
    plannedDate: string;
    destination: string;
    content: string;
    otherContent: string;
    note: string;
  };

  building1: {
    structureType: string;
    floorCount: string;
    penthouse: string;
    usage: string;
    fireRequirement: string;
    note: string;
  };

  building2: {
    did: string;
    glToDesign: string;
    designToFoundation: string;
    foundationToBase: string;
    baseToSecondBeam: string;
    secondToThirdBeam: string;
    firstToRoofBeam: string;
    secondToRoofBeam: string;
    thirdToRoofBeam: string;
    firstFloorThickness: string;
    secondFloorThickness: string;
    thirdFloorThickness: string;
    note: string;
  };

  design: {
    method: string;
    otherContent: string;
    seismicPerformance: string;
    windPerformance: string;
    snowRegion: string;
    snowAmount: string;
    note: string;
  };

  foundation: {
    did: string;
    shape: string;
    frost: string;
    frostValue: string;
    deep: string;
    deepValue: string;
    high: string;
    highValue: string;
    note: string;
  };

  ground: {
    applicationData: string;
    status: string;
    note: string;
  };

  materials: {
    reference: string;
    previousBuilding: string;

    foundation: MaterialItem;
    girder: MaterialItem;
    beam: MaterialItem;
    purlin: MaterialItem;
    column: MaterialItem;
    roofPost: MaterialItem;
    rafter: MaterialItem;
    brace: MaterialItem;
  };

  wall: {
    outer: string;
    inner: string;
    note: string;
  };

  delivery: {
    method: string;
    destination: string;
    billingTo: string;
    billingAddress: string;
  };

  userId?: string;
};

export  const initialForm: FormDataType = {
  customer: {
    companyName: "",
    projectName: "",
    personInCharge: "",
    differentCompany: "",
    phone: "",
    note: "",
  },

  application: {
    plannedDate: "",
    destination: "",
    content: "",
    otherContent: "",
    note: "",
  },

  building1: {
    structureType: "",
    floorCount: "",
    penthouse: "",
    usage: "",
    fireRequirement: "",
    note: "",
  },

  building2: {
    did: "",
    glToDesign: "",
    designToFoundation: "",
    foundationToBase: "",
    baseToSecondBeam: "",
    secondToThirdBeam: "",
    firstToRoofBeam: "",
    secondToRoofBeam: "",
    thirdToRoofBeam: "",
    firstFloorThickness: "",
    secondFloorThickness: "",
    thirdFloorThickness: "",
    note: "",
  },

  design: {
    method: "",
    otherContent: "",
    seismicPerformance: "",
    windPerformance: "",
    snowRegion: "",
    snowAmount: "",
    note: "",
  },

  foundation: {
    did: "",
    shape: "",
    frost: "",
    frostValue: "",
    deep: "",
    deepValue: "",
    high: "",
    highValue: "",
    note: "",
  },

  ground: {
    applicationData: "",
    status: "",
    note: "",
  },

  materials: {
    reference: "",
    previousBuilding: "",

    foundation: { material: "", section: "", note: "" },
    girder: { material: "", section: "", note: "" },
    beam: { material: "", section: "", note: "" },
    purlin: { material: "", section: "", note: "" },
    column: { material: "", section: "", note: "" },
    roofPost: { material: "", section: "", note: "" },
    rafter: { material: "", section: "", note: "" },
    brace: { material: "", section: "", note: "" },
  },

  wall: {
    outer: "",
    inner: "",
    note: "",
  },

  delivery: {
    method: "",
    destination: "",
    billingTo: "",
    billingAddress: "",
  },

  userId: undefined,
};

export type StructureRequest = FormDataType & {
  id: string
  createdAt?: any
}