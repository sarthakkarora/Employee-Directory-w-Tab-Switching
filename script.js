document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content .tab-pane');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    let employees = [
        { id: 1, name: 'John Smith', email: 'john.smith@example.com', position: 'Developer', department: 'IT' },
        { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', position: 'Designer', department: 'Marketing' },
        { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', position: 'Manager', department: 'HR' },
        { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', position: 'Engineer', department: 'Engineering' },
        { id: 5, name: 'Daniel Brown', email: 'daniel.brown@example.com', position: 'Analyst', department: 'Finance' },
        { id: 6, name: 'Emma Wilson', email: 'emma.wilson@example.com', position: 'Consultant', department: 'Consulting' },
        { id: 7, name: 'Matthew Moore', email: 'matthew.moore@example.com', position: 'Administrator', department: 'Admin' },
        { id: 8, name: 'Sophia Taylor', email: 'sophia.taylor@example.com', position: 'Coordinator', department: 'Operations' },
        { id: 9, name: 'David Anderson', email: 'david.anderson@example.com', position: 'Specialist', department: 'HR' },
        { id: 10, name: 'Olivia Thomas', email: 'olivia.thomas@example.com', position: 'Supervisor', department: 'Management' },
        { id: 11, name: 'James Martinez', email: 'james.martinez@example.com', position: 'Director', department: 'Management' },
        { id: 12, name: 'Ava Harris', email: 'ava.harris@example.com', position: 'Manager', department: 'HR' },
        { id: 13, name: 'Alexander Clark', email: 'alexander.clark@example.com', position: 'Developer', department: 'IT' },
        { id: 14, name: 'Isabella Lewis', email: 'isabella.lewis@example.com', position: 'Designer', department: 'Marketing' },
        { id: 15, name: 'Benjamin Walker', email: 'benjamin.walker@example.com', position: 'Engineer', department: 'Engineering' },
        { id: 16, name: 'Mia Young', email: 'mia.young@example.com', position: 'Analyst', department: 'Finance' },
        { id: 17, name: 'Lucas Allen', email: 'lucas.allen@example.com', position: 'Consultant', department: 'Consulting' },
        { id: 18, name: 'Charlotte King', email: 'charlotte.king@example.com', position: 'Administrator', department: 'Admin' },
        { id: 19, name: 'Henry Wright', email: 'henry.wright@example.com', position: 'Coordinator', department: 'Operations' },
        { id: 20, name: 'Amelia Scott', email: 'amelia.scott@example.com', position: 'Specialist', department: 'HR' }
    ];

    const employeesPerPage = 5;

    function switchTab(tabNumber) {
        tabs.forEach(tab => {
            const isActive = tab.dataset.tab == tabNumber;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });

        tabContents.forEach(content => {
            const isActive = content.dataset.tab == tabNumber;
            content.classList.toggle('active', isActive);
            content.setAttribute('aria-hidden', !isActive);
        });

        displayEmployees(tabNumber);
    }

    function displayEmployees(tabNumber) {
        const start = (tabNumber - 1) * employeesPerPage;
        const end = start + employeesPerPage;
        const employeesForTab = employees.slice(start, end);
        const tabContentId = `tab-content-${tabNumber}`;
        const container = document.getElementById(tabContentId);

        container.innerHTML = employeesForTab.map(emp => `
            <div class="employee-box">
                <p>${emp.id}. ${emp.name} - ${emp.email}</p>
                <p><strong>Position:</strong> ${emp.position}</p>
                <p><strong>Department:</strong> ${emp.department}</p>
            </div>
        `).join('');
    }

    function searchEmployees(query) {
        query = query.toLowerCase().trim();

        if (!query) {
            const activeTab = document.querySelector('.tab.active');
            if (activeTab) {
                switchTab(activeTab.dataset.tab);
            }
            return;
        }

        const filteredEmployees = employees.filter(emp =>
            emp.name.toLowerCase().includes(query) ||
            emp.email.toLowerCase().includes(query) ||
            emp.position.toLowerCase().includes(query) || // Include position in search
            emp.department.toLowerCase().includes(query) // Include department in search
        );

        tabContents.forEach(content => {
            const tabNumber = content.dataset.tab;
            const tabContentId = `tab-content-${tabNumber}`;
            const tabContent = document.getElementById(tabContentId);

            if (tabContent && tabContent.classList.contains('active')) {
                tabContent.innerHTML = filteredEmployees.map(emp => `
                    <div class="employee-box">
                        <p>${emp.id}. ${emp.name} - ${emp.email}</p>
                        <p><strong>Position:</strong> ${emp.position}</p>
                        <p><strong>Department:</strong> ${emp.department}</p>
                    </div>
                `).join('');
            }
        });
    }

    function sortEmployees(key) {
        employees.sort((a, b) => {
            const aValue = a[key].toLowerCase();
            const bValue = b[key].toLowerCase();
            if (aValue < bValue) return -1;
            if (aValue > bValue) return 1;
            return 0;
        });

        const activeTab = document.querySelector('.tab.active');
        if (activeTab) {
            switchTab(activeTab.dataset.tab);
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });

    sortSelect.addEventListener('change', () => {
        const sortBy = sortSelect.value;
        sortEmployees(sortBy);
    });

    searchInput.addEventListener('input', () => {
        searchEmployees(searchInput.value);
    });


    switchTab(1);
});
