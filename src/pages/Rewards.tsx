import { Coins, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Rewards = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-gray-900">Rewards</h1>
        
        {/* Reward Balance Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500" />
          {/* <h2 className="text-xl font-semibold mb-4">Reward Balance</h2> */}
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-green-500" />
            <span className="text-5xl font-bold text-green-500">946</span>
          </div>
          {/* <p className="text-gray-600 mt-2">Available Points</p> */}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Transactions */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <p className="text-sm text-gray-500 w-24">2024-09-11</p>
                  <ArrowUpRight className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Points earned for collecting waste</p>
                  </div>
                </div>
                <span className="text-green-500 font-semibold">+56</span>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-200">
                <div className="flex items-start gap-3">
                  <p className="text-sm text-gray-500 w-24">2024-09-11</p>
                  <ArrowUpRight className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium">Points earned for reporting waste</p>
                  </div>
                </div>
                <span className="text-green-500 font-semibold">+10</span>
              </div>
              <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <p className="text-sm text-gray-500 w-24">2024-09-11</p>
                  <ArrowDownRight className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-medium">Redeemed all points</p>
                  </div>
                </div>
                <span className="text-red-500 font-semibold">-10</span>
              </div>
            </div>
          </div>

{/* Available Rewards */}
<div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Rewards</h2>
            <ScrollArea className="h-[calc(100vh-24rem)] rounded-2xl">
              <div className="pr-4 space-y-4">
                {/* Xbox Gift Card */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-[#107C10]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src="https://assets.xboxservices.com/assets/fb/d2/fbd2cb56-5c25-414d-9f46-e6a164cdf5be.png?n=0530_Content-Placement-0_353907-MWF_740x417.png" 
                           alt="Xbox Gift Card" 
                           className="object-contain h-full w-full p-8" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg">Xbox Digital Gift Card</h3>
                    <p className="text-sm text-gray-600">Get an Xbox Gift Card to buy games, devices, and more at Microsoft Store</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-reward-green font-medium">946 of 1,500 points</span>
                      </div>
                      <Progress value={63} className="h-2 bg-gray-100 [&>div]:bg-green-600" />
                    </div>
                    <Button className="w-full bg-[#107C10] hover:bg-[#107C10]/90">
                      Redeem Reward
                    </Button>
                  </div>
                </Card>

                {/* PlayStation Card */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-[#00439C]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src="https://images.hdqwalls.com/wallpapers/playstation-logo-background-4k-u9.jpg" 
                           alt="PlayStation Gift Card" 
                           className="object-contain h-full w-full" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg">PlayStation Store Gift Card</h3>
                    <p className="text-sm text-gray-600">Redeem for PlayStation games, add-ons, themes and more</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-reward-green font-medium">946 of 2,000 points</span>
                      </div>
                      <Progress value={47} className="h-2 bg-gray-100 [&>div]:bg-[#00439C]/90" />
                    </div>
                    <Button className="w-full bg-[#00439C] hover:bg-[#00439C]/90">
                      Redeem Reward
                    </Button>
                  </div>
                </Card>

                {/* Amazon Gift Card */}
                <Card className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video relative bg-[#232F3E]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img src="https://m.media-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" 
                           alt="Amazon Gift Card" 
                           className="object-contain h-full w-full p-8" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg">Amazon.com Gift Card</h3>
                    <p className="text-sm text-gray-600">Redeem for millions of items at Amazon.com</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-reward-green font-medium">946 of 6,500 points</span>
                      </div>
                      <Progress value={15} className="h-2 bg-gray-100 [&>div]:bg-[#232F3E]/90" />
                    </div>
                    <Button className="w-full bg-[#232F3E] hover:bg-[#232F3E]/90">
                      Redeem Reward
                    </Button>
                  </div>
                </Card>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;