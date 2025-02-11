import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';

const SkillMatrix = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    skillSet: '',
    level: ''
  });
  
  // Initial data
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
          <CardTitle className="text-xl font-bold">SKILL MATRIX APP</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" /> Add Record
              </Button>
            </DialogTrigger>
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
                    <SelectTrigger>
                      <SelectValue placeholder="Select Skill Set" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillOptions.map((skill) => (
                        <SelectItem key={skill} value={skill}>
                          {skill}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={formData.level}
                    onValueChange={(value) => setFormData({ ...formData, level: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddRecord} className="bg-green-600 hover:bg-green-700">
                  Add Record
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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
            className="bg-green-600 hover:bg-green-700 text-white"
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
    </Card>
  );
};

export default SkillMatrix;
