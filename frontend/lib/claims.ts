export type Claim = {
  id: string;
  patient: string;
  hospital: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected" | "Tokenized";
  tokenId?: string;
};

export let claims: Claim[] = [
  {
    id: "AFY-1024",
    patient: "Jean Claude",
    hospital: "Kigali Medical Center",
    amount: 4500,
    status: "Pending",
  },
  {
    id: "AFY-1025",
    patient: "Diane Uwase",
    hospital: "Rwanda Care Hospital",
    amount: 7200,
    status: "Pending",
  },
  {
    id: "AFY-1026",
    patient: "Eric Mutoni",
    hospital: "Legacy Health Clinic",
    amount: 3850,
    status: "Approved",
  },
];
export function tokenizeClaim(id: string) {
  claims = claims.map((c) =>
    c.id === id
      ? { ...c, status: "Tokenized", tokenId: "TKN-" + id }
      : c
  );
}
export function updateClaimStatus(
  id: string,
  status: Claim["status"]
) {
  claims = claims.map((c) =>
    c.id === id ? { ...c, status } : c
  );
}   
claims.filter((c: any) => c.status === "Approved")