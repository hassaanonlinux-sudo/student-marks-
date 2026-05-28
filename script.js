const selectedClass = document.querySelector(".classes")


const btn = document.getElementById('calculateBtn');
btn.addEventListener('click', function (e) {
    e.preventDefault()


    const nameInp = document.querySelector("#name")
    let nameVal = nameInp.value
    const rollInp = document.querySelector("#rollno")
    let rollVal = rollInp.value
    const classInp = document.querySelector("#Class")
    let classVal = classInp.value
    const groupInp = document.querySelector("#group")
    let groupVal = groupInp.value

    // Validate basic fields
    if (nameVal === "" || rollVal === "" || classVal === "" || groupVal === "") {
        alert("Please fill in all student information fields!")
        return
    }

    // Get all marks
    const englishMarks = document.querySelector("#english").value
    const mathMarks = document.querySelector("#math")?.value || 0
    const urduMarks = document.querySelector("#urdu").value
    const islamiatMarks = document.querySelector("#islamiat").value
    const physicsMarks = document.querySelector("#physics").value
    const chemistryMarks = document.querySelector("#chemistry")?.value || ""
    const biologyMarks = document.querySelector("#biology")?.value || ""
    const tarjamaMarks = document.querySelector("#Tarjama-tul-quran").value

    // Validate all marks are filled based on group
    let marksValid = true
    if (groupVal === "ICS") {
        // ICS: English, Math, Urdu, Islamiat, Physics, Computer Science (biology id), Tarjama - NO CHEMISTRY
        if (englishMarks === "" || mathMarks === "" || urduMarks === "" || islamiatMarks === "" || physicsMarks === "" || biologyMarks === "" || tarjamaMarks === "") {
            marksValid = false
        }
    } else if (groupVal === "PRE-MEDICAL") {
        // PRE-MEDICAL: all 7 subjects including chemistry
        if (
            englishMarks === "" ||
            chemistryMarks === "" ||
            urduMarks === "" ||
            islamiatMarks === "" ||
            physicsMarks === "" ||
            biologyMarks === "" ||
            tarjamaMarks === ""
        ) {
            marksValid = false
        }
    } else if (groupVal === "PRE-ENG") {
        // PRE-ENG: English, Math, Urdu, Islamiat, Physics, Chemistry, Biology, Tarjama
        if (englishMarks === "" || mathMarks === "" || urduMarks === "" || islamiatMarks === "" || physicsMarks === "" || chemistryMarks === "" || tarjamaMarks === "" || biologyMarks === "") {
            marksValid = false
        }
    }


    if (!marksValid) {
        alert("Please fill in all marks fields!")
        return
    }

    // Calculate results BEFORE creating the result card
    let calculationData = null

    if (classVal === "9th" || classVal === "10th") {
        if (groupVal === "Science" || groupVal === "Arts") {
            const totalMarks = 550
            let obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(chemistryMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            const percentage = (obtainedMarks / totalMarks) * 100
            let gpa = 0
            if (percentage >= 80) gpa = 4.0
            else if (percentage >= 70) gpa = 3.0
            else if (percentage >= 60) gpa = 2.0
            else if (percentage >= 50) gpa = 1.0
            else gpa = 0.0

            const status = percentage >= 40 ? "Pass" : "Fail"

            calculationData = { totalMarks, obtainedMarks, percentage, gpa, status }
        }
    } else if (classVal === "11th" || classVal === "12th") {
        if (groupVal === "ICS") {
            const totalMarks = 550
            let obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            const percentage = (obtainedMarks / totalMarks) * 100
            let gpa = 0
            if (percentage >= 80) gpa = 4.0
            else if (percentage >= 70) gpa = 3.0
            else if (percentage >= 60) gpa = 2.0
            else if (percentage >= 50) gpa = 1.0
            else gpa = 0.0

            const status = percentage >= 40 ? "Pass" : "Fail"

            calculationData = { totalMarks, obtainedMarks, percentage, gpa, status }
        } else if (groupVal === "PRE-MEDICAL") {
            const totalMarks = 550
            let obtainedMarks =
                parseFloat(englishMarks) +
                parseFloat(chemistryMarks) +
                parseFloat(urduMarks) +
                parseFloat(islamiatMarks) +
                parseFloat(physicsMarks) +
                parseFloat(biologyMarks) +
                parseFloat(tarjamaMarks)
            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            const percentage = (obtainedMarks / totalMarks) * 100
            let gpa = 0
            if (percentage >= 80) gpa = 4.0
            else if (percentage >= 70) gpa = 3.0
            else if (percentage >= 60) gpa = 2.0
            else if (percentage >= 50) gpa = 1.0
            else gpa = 0.0

            const status = percentage >= 40 ? "Pass" : "Fail"

            calculationData = { totalMarks, obtainedMarks, percentage, gpa, status }
        } else if (groupVal === "PRE-ENG") {
            const totalMarks = 550
            let obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(chemistryMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            const percentage = (obtainedMarks / totalMarks) * 100
            let gpa = 0
            if (percentage >= 80) gpa = 4.0
            else if (percentage >= 70) gpa = 3.0
            else if (percentage >= 60) gpa = 2.0
            else if (percentage >= 50) gpa = 1.0
            else gpa = 0.0

            const status = percentage >= 40 ? "Pass" : "Fail"

            calculationData = { totalMarks, obtainedMarks, percentage, gpa, status }
        }
    }
    else if (classVal === "Matric" || classVal === "Intermediate") {
        if (groupVal === "Science" || groupVal === "Arts" || groupVal === "ICS" || groupVal === "PRE-MEDICAL" || groupVal === "PRE-ENG") {
            const totalMarks = 1100
            let obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(chemistryMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            const percentage = (obtainedMarks / totalMarks) * 100
            let gpa = 0
            if (percentage >= 80) gpa = 4.0
            else if (percentage >= 70) gpa = 3.0
            else if (percentage >= 60) gpa = 2.0
            else if (percentage >= 50) gpa = 1.0
            else gpa = 0.0

            const status = percentage >= 40 ? "Pass" : "Fail"

            calculationData = { totalMarks, obtainedMarks, percentage, gpa, status }
        }
    }

    // Only create result card if calculations were successful
    if (!calculationData) {
        return
    }










    const oldGroup = document.querySelector(".result-card")

    if (oldGroup) {
        oldGroup.remove()
    }




    const section = document.createElement("section")
    section.className = "result-card"


    // HEADING
    const heading = document.createElement("h2")
    heading.textContent = "Result Card"


    // STUDENT RESULT DIV
    const studentResult = document.createElement("div")
    studentResult.className = "student-result"


    // ===== NAME =====
    const item1 = document.createElement("div")
    item1.className = "result-item"

    const nameHeading = document.createElement("h3")
    nameHeading.textContent = "Name:"

    const nameSpan = document.createElement("span")
    nameSpan.id = "resultName"
    nameSpan.textContent = nameVal

    item1.append(nameHeading, nameSpan)


    // ===== ROLL NO =====
    const item2 = document.createElement("div")
    item2.className = "result-item"

    const rollHeading = document.createElement("h3")
    rollHeading.textContent = "Roll No:"

    const rollSpan = document.createElement("span")
    rollSpan.id = "resultRoll"
    rollSpan.textContent = rollVal

    item2.append(rollHeading, rollSpan)


    // ===== CLASS =====
    const item3 = document.createElement("div")
    item3.className = "result-item"

    const classHeading = document.createElement("h3")
    classHeading.textContent = "Class"

    const classSpan = document.createElement("span")
    classSpan.id = "resultClass"
    classSpan.textContent = classVal

    item3.append(classHeading, classSpan)


    // ===== GROUP =====
    const item4 = document.createElement("div")
    item4.className = "result-item"

    const groupHeading = document.createElement("h3")
    groupHeading.textContent = "Group"

    const groupSpan = document.createElement("span")
    groupSpan.id = "resultGroup"
    groupSpan.textContent = groupVal

    item4.append(groupHeading, groupSpan)


    // ===== TOTAL MARKS =====
    const item5 = document.createElement("div")
    item5.className = "result-item"

    const totalHeading = document.createElement("h3")
    totalHeading.textContent = "Total Marks"

    const totalSpan = document.createElement("span")
    totalSpan.id = "totalMarks"
    totalSpan.textContent = calculationData.totalMarks

    item5.append(totalHeading, totalSpan)


    // ===== OBTAINED MARKS =====
    const item6 = document.createElement("div")
    item6.className = "result-item"

    const obtainedHeading = document.createElement("h3")
    obtainedHeading.textContent = "Obtained Marks"

    const obtainedSpan = document.createElement("span")
    obtainedSpan.id = "obtainedMarks"
    obtainedSpan.textContent = calculationData.obtainedMarks

    item6.append(obtainedHeading, obtainedSpan)


    // ===== PERCENTAGE =====
    const item7 = document.createElement("div")
    item7.className = "result-item"

    const percentageHeading = document.createElement("h3")
    percentageHeading.textContent = "Percentage"

    const percentageSpan = document.createElement("span")
    percentageSpan.id = "percentage"
    percentageSpan.textContent = calculationData.percentage.toFixed(2) + "%"

    item7.append(percentageHeading, percentageSpan)


    // ===== GPA =====
    const item8 = document.createElement("div")
    item8.className = "result-item"

    const gpaHeading = document.createElement("h3")
    gpaHeading.textContent = "GPA"

    const gpaSpan = document.createElement("span")
    gpaSpan.id = "gpa"
    gpaSpan.textContent = calculationData.gpa.toFixed(1)

    item8.append(gpaHeading, gpaSpan)


    // ALL ITEMS APPEND
    studentResult.append(
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        item7,
        item8
    )


    // STATUS DIV
    const statusDiv = document.createElement("div")
    statusDiv.className = "status"


    // INPUT
    const statusInput = document.createElement("input")
    statusInput.type = "text"
    statusInput.id = "status"
    statusInput.readOnly = true
    statusInput.value = calculationData.status

    if (calculationData.status === "Pass") {
        statusInput.style.background = "linear-gradient(135deg, #11998e, #38ef7d)"
        statusInput.style.color = "white"
        statusInput.style.borderColor = "rgba(56, 239, 125, 0.4)"
        statusInput.style.boxShadow = "0 8px 25px rgba(56, 239, 125, 0.3)"
    } else {
        statusInput.style.background = "linear-gradient(135deg, #eb3349, #f45c43)"
        statusInput.style.color = "white"
        statusInput.style.borderColor = "rgba(244, 92, 67, 0.4)"
        statusInput.style.boxShadow = "0 8px 25px rgba(244, 92, 67, 0.3)"
    }

    statusDiv.appendChild(statusInput)


    // FINAL APPEND
    section.append(heading, studentResult, statusDiv)

    document.body.appendChild(section)






    //?Calculate Results


    if (classVal === "9th" || classVal === "10th") {
        if (groupVal === "Science" || groupVal === "Arts") {
            const totalMarks = 550
            let obtainedMarks = 0

            obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(chemistryMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)


            if (obtainedMarks > totalMarks) {
                console.log("Obtained marks cannot be greater than total marks.")
                return
            }


            totalSpan.textContent = totalMarks
            obtainedSpan.textContent = obtainedMarks

            const percentage = (obtainedMarks / totalMarks) * 100
            percentageSpan.textContent = percentage.toFixed(2) + "%"

            let gpa = 0
            if (percentage >= 80) {
                gpa = 4.0
            } else if (percentage >= 70) {
                gpa = 3.0
            } else if (percentage >= 60) {
                gpa = 2.0
            } else if (percentage >= 50) {
                gpa = 1.0
            } else {
                gpa = 0.0
            }
            gpaSpan.textContent = gpa.toFixed(1)

            if (percentage >= 40) {
                statusInput.value = "Pass"
                statusInput.style.background = "linear-gradient(135deg, #11998e, #38ef7d)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(56, 239, 125, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(56, 239, 125, 0.3)"
            } else {
                statusInput.value = "Fail"
                statusInput.style.background = "linear-gradient(135deg, #eb3349, #f45c43)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(244, 92, 67, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(244, 92, 67, 0.3)"
            }
        }

    }
    if (classVal === "11th" || classVal === "12th") {

        if (groupVal === "ICS") {
            const totalMarks = 550
            let obtainedMarks = 0

            obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            totalSpan.textContent = totalMarks
            obtainedSpan.textContent = obtainedMarks

            const percentage = (obtainedMarks / totalMarks) * 100
            percentageSpan.textContent = percentage.toFixed(2) + "%"

            let gpa = 0
            if (percentage >= 80) {
                gpa = 4.0
            } else if (percentage >= 70) {
                gpa = 3.0
            } else if (percentage >= 60) {
                gpa = 2.0
            } else if (percentage >= 50) {
                gpa = 1.0
            } else {
                gpa = 0.0
            }
            gpaSpan.textContent = gpa.toFixed(1)

            if (percentage >= 40) {
                statusInput.value = "Pass"
                statusInput.style.background = "linear-gradient(135deg, #11998e, #38ef7d)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(56, 239, 125, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(56, 239, 125, 0.3)"
            } else {
                statusInput.value = "Fail"
                statusInput.style.background = "linear-gradient(135deg, #eb3349, #f45c43)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(244, 92, 67, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(244, 92, 67, 0.3)"
            }
        }
        if (groupVal === "PRE-MEDICAL") {
            const totalMarks = 550
            let obtainedMarks = 0

            obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(chemistryMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            totalSpan.textContent = totalMarks
            obtainedSpan.textContent = obtainedMarks

            const percentage = (obtainedMarks / totalMarks) * 100
            percentageSpan.textContent = percentage.toFixed(2) + "%"

            let gpa = 0
            if (percentage >= 80) {
                gpa = 4.0
            } else if (percentage >= 70) {
                gpa = 3.0
            } else if (percentage >= 60) {
                gpa = 2.0
            } else if (percentage >= 50) {
                gpa = 1.0
            } else {
                gpa = 0.0
            }
            gpaSpan.textContent = gpa.toFixed(1)

            if (percentage >= 40) {
                statusInput.value = "Pass"
                statusInput.style.background = "linear-gradient(135deg, #11998e, #38ef7d)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(56, 239, 125, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(56, 239, 125, 0.3)"
            } else {
                statusInput.value = "Fail"
                statusInput.style.background = "linear-gradient(135deg, #eb3349, #f45c43)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(244, 92, 67, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(244, 92, 67, 0.3)"
            }
        }
        if (groupVal === "PRE-ENG") {
            const totalMarks = 550
            let obtainedMarks = 0

            obtainedMarks = parseFloat(englishMarks) + parseFloat(mathMarks) + parseFloat(urduMarks) + parseFloat(islamiatMarks) + parseFloat(physicsMarks) + parseFloat(chemistryMarks) + parseFloat(biologyMarks) + parseFloat(tarjamaMarks)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            totalSpan.textContent = totalMarks
            obtainedSpan.textContent = obtainedMarks

            const percentage = (obtainedMarks / totalMarks) * 100
            percentageSpan.textContent = percentage.toFixed(2) + "%"

            let gpa = 0
            if (percentage >= 80) {
                gpa = 4.0
            } else if (percentage >= 70) {
                gpa = 3.0
            } else if (percentage >= 60) {
                gpa = 2.0
            } else if (percentage >= 50) {
                gpa = 1.0
            } else {
                gpa = 0.0
            }
            gpaSpan.textContent = gpa.toFixed(1)

            if (percentage >= 40) {
                statusInput.value = "Pass"
                statusInput.style.background = "linear-gradient(135deg, #11998e, #38ef7d)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(56, 239, 125, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(56, 239, 125, 0.3)"
            } else {
                statusInput.value = "Fail"
                statusInput.style.background = "linear-gradient(135deg, #eb3349, #f45c43)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(244, 92, 67, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(244, 92, 67, 0.3)"
            }
        }

    }


    else if (classVal === "Matric" || classVal === "Intermediate") {
        if (groupVal === "Science" || groupVal === "Arts" || groupVal === "ICS" || groupVal === "PRE-MEDICAL" || groupVal === "PRE-ENG") {
            const totalMarks = 1100
            let obtainedMarks = 0


            obtainedMarks =
                (parseFloat(englishMarks) || 0) +
                (parseFloat(mathMarks) || 0) +
                (parseFloat(urduMarks) || 0) +
                (parseFloat(islamiatMarks) || 0) +
                (parseFloat(physicsMarks) || 0) +
                (parseFloat(chemistryMarks) || 0) +
                (parseFloat(biologyMarks) || 0) +
                (parseFloat(tarjamaMarks) || 0)

            if (obtainedMarks > totalMarks) {
                alert("Obtained marks cannot be greater than total marks.")
                return
            }

            totalSpan.textContent = totalMarks
            obtainedSpan.textContent = obtainedMarks

            const percentage = (obtainedMarks / totalMarks) * 100
            percentageSpan.textContent = percentage.toFixed(2) + "%"

            let gpa = 0
            if (percentage >= 80) {
                gpa = 4.0
            } else if (percentage >= 70) {
                gpa = 3.0
            } else if (percentage >= 60) {
                gpa = 2.0
            } else if (percentage >= 50) {
                gpa = 1.0
            } else {
                gpa = 0.0
            }
            gpaSpan.textContent = gpa.toFixed(1)

            if (percentage >= 40) {
                statusInput.value = "Pass"
                statusInput.style.background = "linear-gradient(135deg, #11998e, #38ef7d)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(56, 239, 125, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(56, 239, 125, 0.3)"
            } else {
                statusInput.value = "Fail"
                statusInput.style.background = "linear-gradient(135deg, #eb3349, #f45c43)"
                statusInput.style.color = "white"
                statusInput.style.borderColor = "rgba(244, 92, 67, 0.4)"
                statusInput.style.boxShadow = "0 8px 25px rgba(244, 92, 67, 0.3)"
            }
        }

    }











})

selectedClass.addEventListener("change", function (e) {
    //? select class and show groups
    let val = e.target.value
    if (val === "9th" || val === "10th" || val === "Matric") {

        const oldGroup = document.querySelector(".groups")

        if (oldGroup) {
            oldGroup.remove()
        }
        const groupsDiv = document.createElement("div")
        groupsDiv.className = "groups"


        const select = document.createElement("select")
        select.name = "groups"
        select.id = "group"


        // DEFAULT OPTION
        const option1 = document.createElement("option")
        option1.value = ""
        option1.disabled = true
        option1.selected = true
        option1.textContent = "Select Group"


        // ARTS OPTION
        const option2 = document.createElement("option")
        option2.value = "Arts"
        option2.textContent = "Arts"


        // SCIENCE OPTION
        const option3 = document.createElement("option")
        option3.value = "Science"
        option3.textContent = "Science"


        // APPEND OPTIONS
        select.append(option1, option2, option3)


        // APPEND SELECT INTO DIV
        groupsDiv.appendChild(select)


        // APPEND INTO BODY
        document.body.appendChild(groupsDiv)
        document.querySelector(".selections").appendChild(groupsDiv)





    }
    else if (val === "11th" || val === "12th" || val === "Intermediate") {
        const oldGroup = document.querySelector(".groups")

        if (oldGroup) {
            oldGroup.remove()
        }
        const groupsDiv = document.createElement("div")
        groupsDiv.className = "groups"


        const select = document.createElement("select")
        select.name = "groups"
        select.id = "group"


        // DEFAULT OPTION
        const option1 = document.createElement("option")
        option1.value = ""
        option1.disabled = true
        option1.selected = true
        option1.textContent = "Select Group"


        // ICS OPTION
        const option2 = document.createElement("option")
        option2.value = "ICS"
        option2.textContent = "ICS"


        // FSC OPTION





        // PRE-MEDICAL OPTION
        const option5 = document.createElement("option")
        option5.value = "PRE-MEDICAL"
        option5.textContent = "PRE-MEDICAL"

        // PRE-ENG OPTION
        const option6 = document.createElement("option")
        option6.value = "PRE-ENG"
        option6.textContent = "PRE-ENG"


        // APPEND OPTIONS
        select.append(
            option1,
            option2,
            option5,
            option6
        )


        // APPEND SELECT INTO DIV
        groupsDiv.appendChild(select)


        // APPEND INTO BODY
        document.body.appendChild(groupsDiv)
        document.querySelector(".selections").appendChild(groupsDiv)



    }

    //? select group and show subjects
    select = document.querySelector("#group")
    select.addEventListener("change", function (e) {
        let groupVal = e.target.value
        if (groupVal === "Science") {


            const oldGroup = document.querySelector(".subjects")

            if (oldGroup) {
                oldGroup.remove()
            }
            const subjectsDiv = document.createElement("div")
            subjectsDiv.className = "subjects"


            // ===== ENGLISH =====
            const group1 = document.createElement("div")
            group1.className = "input-group"

            const label1 = document.createElement("label")
            label1.setAttribute("for", "english")
            label1.textContent = "English"

            const input1 = document.createElement("input")
            input1.type = "number"
            input1.id = "english"
            input1.placeholder = "Marks"

            group1.append(label1, input1)


            // ===== MATH =====
            const group2 = document.createElement("div")
            group2.className = "input-group"

            const label2 = document.createElement("label")
            label2.setAttribute("for", "math")
            label2.textContent = "Math"

            const input2 = document.createElement("input")
            input2.type = "number"
            input2.id = "math"
            input2.placeholder = "Marks"

            group2.append(label2, input2)


            // ===== URDU =====
            const group3 = document.createElement("div")
            group3.className = "input-group"

            const label3 = document.createElement("label")
            label3.setAttribute("for", "urdu")
            label3.textContent = "Urdu"

            const input3 = document.createElement("input")
            input3.type = "number"
            input3.id = "urdu"
            input3.placeholder = "Marks"

            group3.append(label3, input3)


            // ===== ISLAMIAT =====
            const group4 = document.createElement("div")
            group4.className = "input-group"

            const label4 = document.createElement("label")
            label4.setAttribute("for", "islamiat")
            label4.textContent = "Islamiat / Pak Studies"

            const input4 = document.createElement("input")
            input4.type = "number"
            input4.id = "islamiat"
            input4.placeholder = "Marks"

            group4.append(label4, input4)


            // ===== PHYSICS =====
            const group5 = document.createElement("div")
            group5.className = "input-group"

            const label5 = document.createElement("label")
            label5.setAttribute("for", "physics")
            label5.textContent = "Physics"

            const input5 = document.createElement("input")
            input5.type = "number"
            input5.id = "physics"
            input5.placeholder = "Marks"

            group5.append(label5, input5)


            // ===== CHEMISTRY =====
            const group6 = document.createElement("div")
            group6.className = "input-group"

            const label6 = document.createElement("label")
            label6.setAttribute("for", "chemistry")
            label6.textContent = "Chemistry"

            const input6 = document.createElement("input")
            input6.type = "number"
            input6.id = "chemistry"
            input6.placeholder = "Marks"

            group6.append(label6, input6)


            // ===== BIOLOGY =====
            const group7 = document.createElement("div")
            group7.className = "input-group"

            const label7 = document.createElement("label")
            label7.setAttribute("for", "biology")
            label7.textContent = "Biology / Computer Science"

            const input7 = document.createElement("input")
            input7.type = "number"
            input7.id = "biology"
            input7.placeholder = "Marks"

            group7.append(label7, input7)


            // ===== TARJAMA =====
            const group8 = document.createElement("div")
            group8.className = "input-group"

            const label8 = document.createElement("label")
            label8.setAttribute("for", "tarjama")
            label8.textContent = "Tarjama-tul-quran"

            const input8 = document.createElement("input")
            input8.type = "number"
            input8.id = "Tarjama-tul-quran"
            input8.placeholder = "Marks"

            group8.append(label8, input8)


            // ===== APPEND ALL =====
            subjectsDiv.append(
                group1,
                group2,
                group3,
                group4,
                group5,
                group6,
                group7,
                group8
            )


            // ===== APPEND INTO BODY =====
            const infoPage = document.querySelector(".info-page")
            const btnDiv = document.querySelector(".btn")
            infoPage.insertBefore(subjectsDiv, btnDiv)



        }
        if (groupVal === "Arts") {


            const oldGroup = document.querySelector(".subjects")

            if (oldGroup) {
                oldGroup.remove()
            }
            const subjectsDiv = document.createElement("div")
            subjectsDiv.className = "subjects"


            // ===== ENGLISH =====
            const group1 = document.createElement("div")
            group1.className = "input-group"

            const label1 = document.createElement("label")
            label1.setAttribute("for", "english")
            label1.textContent = "English"

            const input1 = document.createElement("input")
            input1.type = "number"
            input1.id = "english"
            input1.placeholder = "Marks"

            group1.append(label1, input1)


            // ===== MATH =====
            const group2 = document.createElement("div")
            group2.className = "input-group"

            const label2 = document.createElement("label")
            label2.setAttribute("for", "math")
            label2.textContent = "Math"

            const input2 = document.createElement("input")
            input2.type = "number"
            input2.id = "math"
            input2.placeholder = "Marks"

            group2.append(label2, input2)


            // ===== URDU =====
            const group3 = document.createElement("div")
            group3.className = "input-group"

            const label3 = document.createElement("label")
            label3.setAttribute("for", "urdu")
            label3.textContent = "Urdu"

            const input3 = document.createElement("input")
            input3.type = "number"
            input3.id = "urdu"
            input3.placeholder = "Marks"

            group3.append(label3, input3)


            // ===== ISLAMIAT =====
            const group4 = document.createElement("div")
            group4.className = "input-group"

            const label4 = document.createElement("label")
            label4.setAttribute("for", "islamiat")
            label4.textContent = "Islamiat "

            const input4 = document.createElement("input")
            input4.type = "number"
            input4.id = "islamiat"
            input4.placeholder = "Marks"

            group4.append(label4, input4)


            // ===== PHYSICS =====
            const group5 = document.createElement("div")
            group5.className = "input-group"

            const label5 = document.createElement("label")
            label5.setAttribute("for", "Physics")
            label5.textContent = "Science"

            const input5 = document.createElement("input")
            input5.type = "number"
            input5.id = "physics"
            input5.placeholder = "Marks"

            group5.append(label5, input5)


            // ===== CHEMISTRY =====
            const group6 = document.createElement("div")
            group6.className = "input-group"

            const label6 = document.createElement("label")
            label6.setAttribute("for", "chemistry")
            label6.textContent = "Civics"

            const input6 = document.createElement("input")
            input6.type = "number"
            input6.id = "chemistry"
            input6.placeholder = "Marks"

            group6.append(label6, input6)


            // ===== BIOLOGY =====
            const group7 = document.createElement("div")
            group7.className = "input-group"

            const label7 = document.createElement("label")
            label7.setAttribute("for", "biology")
            label7.textContent = "History"

            const input7 = document.createElement("input")
            input7.type = "number"
            input7.id = "biology"
            input7.placeholder = "Marks"

            group7.append(label7, input7)


            // ===== TARJAMA =====
            const group8 = document.createElement("div")
            group8.className = "input-group"

            const label8 = document.createElement("label")
            label8.setAttribute("for", "tarjama")
            label8.textContent = "Tarjama-tul-quran"

            const input8 = document.createElement("input")
            input8.type = "number"
            input8.id = "Tarjama-tul-quran"
            input8.placeholder = "Marks"

            group8.append(label8, input8)


            // ===== APPEND ALL =====
            subjectsDiv.append(
                group1,
                group2,
                group3,
                group4,
                group5,
                group6,
                group7,
                group8
            )


            // ===== APPEND INTO BODY =====
            const infoPage = document.querySelector(".info-page")
            const btnDiv = document.querySelector(".btn")
            infoPage.insertBefore(subjectsDiv, btnDiv)



        }
        else if (groupVal === "ICS") {
            const oldGroup = document.querySelector(".subjects")

            if (oldGroup) {
                oldGroup.remove()
            }
            const subjectsDiv = document.createElement("div")
            subjectsDiv.className = "subjects"


            // ===== ENGLISH =====
            const group1 = document.createElement("div")
            group1.className = "input-group"

            const label1 = document.createElement("label")
            label1.setAttribute("for", "english")
            label1.textContent = "English"

            const input1 = document.createElement("input")
            input1.type = "number"
            input1.id = "english"
            input1.placeholder = "Marks"

            group1.append(label1, input1)


            // ===== MATH =====
            const group2 = document.createElement("div")
            group2.className = "input-group"

            const label2 = document.createElement("label")
            label2.setAttribute("for", "math")
            label2.textContent = "Math"

            const input2 = document.createElement("input")
            input2.type = "number"
            input2.id = "math"
            input2.placeholder = "Marks"

            group2.append(label2, input2)


            // ===== URDU =====
            const group3 = document.createElement("div")
            group3.className = "input-group"

            const label3 = document.createElement("label")
            label3.setAttribute("for", "urdu")
            label3.textContent = "Urdu"

            const input3 = document.createElement("input")
            input3.type = "number"
            input3.id = "urdu"
            input3.placeholder = "Marks"

            group3.append(label3, input3)


            // ===== ISLAMIAT =====
            const group4 = document.createElement("div")
            group4.className = "input-group"

            const label4 = document.createElement("label")
            label4.setAttribute("for", "islamiat")
            label4.textContent = "Islamiat / Pak Studies"

            const input4 = document.createElement("input")
            input4.type = "number"
            input4.id = "islamiat"
            input4.placeholder = "Marks"

            group4.append(label4, input4)


            // ===== PHYSICS =====
            const group5 = document.createElement("div")
            group5.className = "input-group"

            const label5 = document.createElement("label")
            label5.setAttribute("for", "physics")
            label5.textContent = "Physics / Statistics"

            const input5 = document.createElement("input")
            input5.type = "number"
            input5.id = "physics"
            input5.placeholder = "Marks"

            group5.append(label5, input5)





            // ===== BIOLOGY =====
            const group7 = document.createElement("div")
            group7.className = "input-group"

            const label7 = document.createElement("label")
            label7.setAttribute("for", "biology")
            label7.textContent = "Computer Science"

            const input7 = document.createElement("input")
            input7.type = "number"
            input7.id = "biology"
            input7.placeholder = "Marks"

            group7.append(label7, input7)


            // ===== TARJAMA =====
            const group8 = document.createElement("div")
            group8.className = "input-group"

            const label8 = document.createElement("label")
            label8.setAttribute("for", "tarjama")
            label8.textContent = "Tarjama-tul-Quran"

            const input8 = document.createElement("input")
            input8.type = "number"
            input8.id = "Tarjama-tul-quran"
            input8.placeholder = "Marks"

            group8.append(label8, input8)


            // ===== APPEND ALL =====
            subjectsDiv.append(
                group1,
                group2,
                group3,
                group4,
                group5,

                group7,
                group8
            )


            // ===== APPEND INTO BODY =====
            const infoPage = document.querySelector(".info-page")
            const btnDiv = document.querySelector(".btn")
            infoPage.insertBefore(subjectsDiv, btnDiv)

        }
        else if (groupVal === "PRE-MEDICAL") {
            const oldGroup = document.querySelector(".subjects")

            if (oldGroup) {
                oldGroup.remove()
            }
            const subjectsDiv = document.createElement("div")
            subjectsDiv.className = "subjects"


            // ===== ENGLISH =====
            const group1 = document.createElement("div")
            group1.className = "input-group"

            const label1 = document.createElement("label")
            label1.setAttribute("for", "english")
            label1.textContent = "English"

            const input1 = document.createElement("input")
            input1.type = "number"
            input1.id = "english"
            input1.placeholder = "Marks"

            group1.append(label1, input1)


            // ===== MATH =====
            const group2 = document.createElement("div")
            group2.className = "input-group"

            const label2 = document.createElement("label")
            label2.setAttribute("for", "math")
            label2.textContent = "Chemistry"

            const input2 = document.createElement("input")
            input2.type = "number"
            input2.id = "chemistry"
            input2.placeholder = "Marks"

            group2.append(label2, input2)


            // ===== URDU =====
            const group3 = document.createElement("div")
            group3.className = "input-group"

            const label3 = document.createElement("label")
            label3.setAttribute("for", "urdu")
            label3.textContent = "Urdu"

            const input3 = document.createElement("input")
            input3.type = "number"
            input3.id = "urdu"
            input3.placeholder = "Marks"

            group3.append(label3, input3)


            // ===== ISLAMIAT =====
            const group4 = document.createElement("div")
            group4.className = "input-group"

            const label4 = document.createElement("label")
            label4.setAttribute("for", "islamiat")
            label4.textContent = "Islamiat  / Pak Studies"

            const input4 = document.createElement("input")
            input4.type = "number"
            input4.id = "islamiat"
            input4.placeholder = "Marks"

            group4.append(label4, input4)


            // ===== PHYSICS =====
            const group5 = document.createElement("div")
            group5.className = "input-group"

            const label5 = document.createElement("label")
            label5.setAttribute("for", "physics")
            label5.textContent = "Physics "

            const input5 = document.createElement("input")
            input5.type = "number"
            input5.id = "physics"
            input5.placeholder = "Marks"

            group5.append(label5, input5)





            // ===== BIOLOGY =====
            const group7 = document.createElement("div")
            group7.className = "input-group"

            const label7 = document.createElement("label")
            label7.setAttribute("for", "biology")
            label7.textContent = "Biology"

            const input7 = document.createElement("input")
            input7.type = "number"
            input7.id = "biology"
            input7.placeholder = "Marks"

            group7.append(label7, input7)


            // ===== TARJAMA =====
            const group8 = document.createElement("div")
            group8.className = "input-group"

            const label8 = document.createElement("label")
            label8.setAttribute("for", "tarjama")
            label8.textContent = "Tarjama-tul-Quran"

            const input8 = document.createElement("input")
            input8.type = "number"
            input8.id = "Tarjama-tul-quran"
            input8.placeholder = "Marks"

            group8.append(label8, input8)


            // ===== APPEND ALL =====
            subjectsDiv.append(
                group1,
                group2,
                group3,
                group4,
                group5,

                group7,
                group8
            )


            // ===== APPEND INTO BODY =====
            const infoPage = document.querySelector(".info-page")
            const btnDiv = document.querySelector(".btn")
            infoPage.insertBefore(subjectsDiv, btnDiv)

        }
        else if (groupVal === "PRE-ENG") {
            const oldGroup = document.querySelector(".subjects")

            if (oldGroup) {
                oldGroup.remove()
            }
            const subjectsDiv = document.createElement("div")
            subjectsDiv.className = "subjects"


            // ===== ENGLISH =====
            const group1 = document.createElement("div")
            group1.className = "input-group"

            const label1 = document.createElement("label")
            label1.setAttribute("for", "english")
            label1.textContent = "English"

            const input1 = document.createElement("input")
            input1.type = "number"
            input1.id = "english"
            input1.placeholder = "Marks"

            group1.append(label1, input1)


            // ===== MATH =====
            const group2 = document.createElement("div")
            group2.className = "input-group"

            const label2 = document.createElement("label")
            label2.setAttribute("for", "math")
            label2.textContent = "Math"

            const input2 = document.createElement("input")
            input2.type = "number"
            input2.id = "math"
            input2.placeholder = "Marks"

            group2.append(label2, input2)


            // ===== URDU =====
            const group3 = document.createElement("div")
            group3.className = "input-group"

            const label3 = document.createElement("label")
            label3.setAttribute("for", "urdu")
            label3.textContent = "Urdu"

            const input3 = document.createElement("input")
            input3.type = "number"
            input3.id = "urdu"
            input3.placeholder = "Marks"

            group3.append(label3, input3)


            // ===== ISLAMIAT =====
            const group4 = document.createElement("div")
            group4.className = "input-group"

            const label4 = document.createElement("label")
            label4.setAttribute("for", "islamiat")
            label4.textContent = "Islamiat "

            const input4 = document.createElement("input")
            input4.type = "number"
            input4.id = "islamiat"
            input4.placeholder = "Marks"

            group4.append(label4, input4)


            // ===== PHYSICS =====
            const group5 = document.createElement("div")
            group5.className = "input-group"

            const label5 = document.createElement("label")
            label5.setAttribute("for", "physics")
            label5.textContent = "Physics "

            const input5 = document.createElement("input")
            input5.type = "number"
            input5.id = "physics"
            input5.placeholder = "Marks"

            group5.append(label5, input5)



            // ===== BIOLOGY =====

            const group6 = document.createElement("div")
            group6.className = "input-group"

            const label6 = document.createElement("label")
            label6.setAttribute("for", "Biology")
            label6.textContent = "Biology"

            const input6 = document.createElement("input")
            input6.type = "number"
            input6.id = "biology"
            input6.placeholder = "Marks"

            group6.append(label6, input6)





            // ===== CHEMISTRY =====
            const group7 = document.createElement("div")
            group7.className = "input-group"

            const label7 = document.createElement("label")
            label7.setAttribute("for", "chemistry")
            label7.textContent = "Chemistry"

            const input7 = document.createElement("input")
            input7.type = "number"
            input7.id = "chemistry"
            input7.placeholder = "Marks"

            group7.append(label7, input7)


            // ===== TARJAMA =====
            const group8 = document.createElement("div")
            group8.className = "input-group"

            const label8 = document.createElement("label")
            label8.setAttribute("for", "tarjama")
            label8.textContent = "Tarjama-tul-Quran"

            const input8 = document.createElement("input")
            input8.type = "number"
            input8.id = "Tarjama-tul-quran"
            input8.placeholder = "Marks"

            group8.append(label8, input8)


            // ===== APPEND ALL =====
            subjectsDiv.append(
                group1,
                group2,
                group3,
                group4,
                group5,
                group6,
                group7,
                group8
            )


            // ===== APPEND INTO BODY =====
            const infoPage = document.querySelector(".info-page")
            const btnDiv = document.querySelector(".btn")
            infoPage.insertBefore(subjectsDiv, btnDiv)

        }




    })
})

const downloadBtn = document.getElementById("downloadBtn")

downloadBtn.addEventListener("click", function () {

    const resultCard = document.querySelector(".result-card")

    if (!resultCard) {
        alert("Please generate result first!")
        return
    }

    window.print()
})

