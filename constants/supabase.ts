const Constants = {
  graphql_public: {
    Enums: {}
  },
  public: {
    Enums: {
      companyForm: ["kft", "bt", "zrt", "nyrt", "ev"],
      completionCertificateStatus: ["created", "accepted", "rejected", "deleted"],
      contractStatus: ["open", "closed", "cancelled"],
      currency: ["HUF", "EUR", "USD"],
      invoiceStatus: ["issued", "paid", "deleted"],
      orderStatus: ["open", "closed", "cancelled"],
      partnerRelation: ["customer", "subcontractor"],
      partnerType: ["new", "existing"],
      projectOwnershipType: ["normal", "subcontracting"],
      projectStatus: ["inprogress", "closed", "suspended", "cancelled"],
      quotationReference: ["Ivett", "existing partner", "website", "google"],
      quotationStatus: ["created", "accepted", "rejected", "deleted"],
      taskCategory: ["ex", "fp", "exfp", "edu", "cons", "rev", "revex", "lpex", "ohs", "env", "lp"],
      taskStatus: ["open", "inprogress", "closed", "suspended", "continuous", "cancelled"],
      workingTimeUnit: ["hours", "days", "weeks", "months"]
    }
  }
} as const

export const SupabaseEnums = Constants.public.Enums

export const getSupabaseEnumValues = (key: string): string[] => {
  return SupabaseEnums[key as SupabaseEnumKeys].map((v) => String(v))
}
