
package com.rentease.rentease.entity;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "leases")
@Data
public class Lease {
    @Id
    private String Id;
    private String houseOwner;
    private String houseNo;
    private Long rentAmount;
    private String startDate;
    private String endDate;
    private Boolean rentPaid;

   
}
