import React, { useState } from 'react';

const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex flex-col space-y-1.5 p-6">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-6 pt-0">{children}</div>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const DialogContent = ({ children }) => (
  <div>{children}</div>
);

const DialogHeader = ({ children }) => (
  <div className="mb-4">{children}</div>
);

const DialogTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

const Select = ({ value, onValueChange, children }) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
    </select>
  );
};

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const SkillMatrix = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    skillSet: '',
    level: ''
  });
  
  const [data, setData] = useState([
    { name: 'John Doe', skillSet: '.NET', level: 'Expert' },
    { name: 'Bob Marty', skillSet: 'SQL Server', level: 'Intermediate' },
    { name: 'Vivek Mano', skillSet: '.NET', level: 'Beginner' },
    { name: 'Jeff Marsh', skillSet: 'Salesforce', level: 'Intermediate' },
    { name: 'Steve Smith', skillSet: 'SQL Server', level: 'Beginner' },
    { name: 'Mark Edwards', skillSet: 'Salesforce', level: 'Expert' },
    { name: 'Nick Bosa', skillSet: '.NET', level: 'Intermediate' }
  ]);

  const skillOptions = ['.NET', 'SQL Server', 'Salesforce'];
  const levelOptions = ['Beginner', 'Intermediate', 'Expert'];

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(searchTermLower) ||
      item.skillSet.toLowerCase().includes(searchTermLower)
    );
    setFilteredData(filtered);
  };

  const handleAddRecord = () => {
    if (formData.name && formData.skillSet && formData.level) {
      setData([...data, formData]);
      setFormData({ name: '', skillSet: '', level: '' });
      setIsDialogOpen(false);
    }
  };

  const dataToDisplay = filteredData || data;

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">SKILL MATRIX APP</h2>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
          >
            + Add Record
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <Input
            type="text"
            placeholder="Search by employee name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button 
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
          >
            Search
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="bg-green-600 text-white p-2 text-left">Employee Name</th>
                <th className="bg-green-600 text-white p-2 text-left">Skill Set</th>
                <th className="bg-green-600 text-white p-2 text-left">Level</th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((item, index) => (
                <tr 
                  key={index}
                  className={index % 2 === 0 ? 'bg-green-50' : 'bg-green-100'}
                >
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.skillSet}</td>
                  <td className="p-2">{item.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Input
                placeholder="Employee Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Select
                value={formData.skillSet}
                onValueChange={(value) => setFormData({ ...formData, skillSet: value })}
              >
                <option value="">Select Skill Set</option>
                {skillOptions.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <option value="">Select Level</option>
                {levelOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Button 
              onClick={handleAddRecord} 
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2"
            >
              Add Record
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SkillMatrix;
