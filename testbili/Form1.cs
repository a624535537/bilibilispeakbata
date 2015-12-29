using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using System.Net;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Threading;

namespace testbili
{
    public partial class Form1 : Form
    {
        public delegate void MyInvoke(string str);
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
           
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            int port = 88;
            IPHostEntry hostinfo = Dns.GetHostEntry(@"livecmt.bilibili.com");
            IPAddress[] aryIP = hostinfo.AddressList;
            string result = aryIP[0].ToString();
            IPAddress ip = IPAddress.Parse(result);
            IPEndPoint danmu = new IPEndPoint(ip, port);
            Socket clientSocket = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            try
            {
                
                int b;
                int.TryParse(textBox2.Text, out b);
                byte[] a = BitConverter.GetBytes(b);
                clientSocket.Connect(danmu);   
                byte[] msg = new byte[12];
                msg[0] = 0x01;
                msg[1] = 0x01;
                msg[2] = 0x00;
                msg[3] = 0x0c;
                msg[4] = a[3];
                msg[5] = a[2];
                msg[6] = a[1];
                msg[7] = a[0];
                for (int i = 0; i < msg.Length; i++)
                {
                    Console.WriteLine(msg[i]);
                }
                clientSocket.Send(msg);

                textBox1.Text += textBox2.Text + "connect success" + Environment.NewLine;
            }
            catch
            {
                Console.WriteLine("连接服务器失败，请按回车键退出！");
                return;
            }//连接弹幕控制台并发送请求信息，int转16进制BitConverter出来的结果是反的是反的是反的！
            ParameterizedThreadStart ParStart = new ParameterizedThreadStart(Run);
            Thread myThread = new Thread(ParStart);
            object obj = clientSocket;
            myThread.Start(clientSocket);//开新线程来接收弹幕
        }
        public void Run(object obj)
        {
            Socket clientSocket = (Socket)obj;
            byte[] index = new byte[1];
            while (true)
            {
                int bufLen = 0;
                try
                {

                    bufLen = clientSocket.Available;
                    byte[] data = new byte[bufLen];
                    clientSocket.Receive(index, 0, 1, SocketFlags.None);
                    if (bufLen == 0)
                    {

                        continue;
                    }
                    if (index[0] == 4)
                    {
                        Console.WriteLine(bufLen);
                        Console.WriteLine(index[0]);
                        clientSocket.Receive(data, 0, bufLen, SocketFlags.None);
                        byte[] json = new byte[bufLen - 3];
                        for (int i = 0; i < json.Length; i++)
                        {
                            json[i] = data[i + 3];
                        }

                        string clientMSG = System.Text.Encoding.UTF8.GetString(json);
                        Regex reg = new Regex(@"\]\,""(\w*)""\,\[");
                        //这里用正则取仅仅是因为不知道c#怎么buffer转json...转了以后目测还得转list再拿...所以我直接转string用正则取了...
                        //弹幕中有,[]之类的可能会error..
                        Match m = reg.Match(clientMSG);
                        String text = m.Groups[1].Value;                       
                        MyInvoke mi = new MyInvoke(SetTxt);
                        BeginInvoke(mi, new object[] { text });//委托主线程刷新UI啥的
                        Console.WriteLine(text);
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }


            }//手动死循环判断服务器有没发data...其实就是个c#版的client.on('data')...不过在主线程的话会阻塞UI刷新导致卡死...
        }
        public void SetTxt(String str)
        {
            textBox1.Text += str + Environment.NewLine;
            WMPLib.WindowsMediaPlayer player = new WMPLib.WindowsMediaPlayer();
            player.URL = "http://tts.baidu.com/text2audio?lan=zh&pid=101&ie=UTF-8&text="+str+"&spd=9";
            player.controls.play();
                       
    }//委托的操作，player并没有关闭

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            System.Environment.Exit(0);
        }
    }
    public class jieshou
    {
      
    }
}
